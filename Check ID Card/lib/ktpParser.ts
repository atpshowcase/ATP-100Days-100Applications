import { KTPData, emptyKTPData } from '@/types/ktp';

export function parseKTPText(text: string): KTPData {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const result: KTPData = { ...emptyKTPData };

    // Join all text for easier searching
    const fullText = text.replace(/\n/g, ' ');

    // Debug: Log the extracted text
    console.log('=== OCR EXTRACTED TEXT ===');
    console.log(text);
    console.log('=== LINES ===');
    lines.forEach((line, idx) => console.log(`Line ${idx}: "${line}"`));
    console.log('========================');

    // Helper function to find value after a label
    const findValue = (labels: string[]): string => {
        for (const line of lines) {
            for (const label of labels) {
                // Make regex more flexible: optional spaces before/after colon
                const regex = new RegExp(`${label}\\s*:?\\s*(.+)`, 'i');
                const match = line.match(regex);
                if (match && match[1]) {
                    console.log(`Found "${label}" -> "${match[1].trim()}"`);
                    return match[1].trim();
                }
            }
        }
        return '';
    };

    // Helper to extract NIK (16 digits)
    const extractNIK = (): string => {
        for (const line of lines) {
            const nikMatch = line.match(/\b(\d{16})\b/);
            if (nikMatch) {
                return nikMatch[1];
            }
        }
        return '';
    };

    // Helper to extract date in various formats
    const extractDate = (): string => {
        // Look for date patterns: DD-MM-YYYY, DD/MM/YYYY, DD MM YYYY
        const datePatterns = [
            /\b(\d{2}[-\/]\d{2}[-\/]\d{4})\b/,
            /\b(\d{2}\s+\d{2}\s+\d{4})\b/,
            /\b(\d{1,2}[-\/]\d{1,2}[-\/]\d{4})\b/
        ];

        for (const pattern of datePatterns) {
            const match = fullText.match(pattern);
            if (match) {
                return match[1].replace(/\s+/g, '-');
            }
        }
        return '';
    };

    // Helper to extract place and date of birth from a combined field
    const extractPlaceAndDate = (text: string): { place: string, date: string } => {
        console.log(`Extracting place and date from: "${text}"`);

        // First, clean up any label prefixes that might have been included
        let cleanedText = text.replace(/^.*?:\s*/, '').trim(); // Remove everything before and including the first colon
        console.log(`After cleaning label: "${cleanedText}"`);

        // Pattern 1: JAKARTA, 18-02-1988 or JAKARTA,18-02-1988
        const pattern1 = /^([^,]+),\s*(\d{2}[-\/]\d{2}[-\/]\d{4})/;
        const match1 = cleanedText.match(pattern1);
        if (match1) {
            console.log(`Pattern 1 matched: place="${match1[1].trim()}", date="${match1[2]}"`);
            return { place: match1[1].trim(), date: match1[2] };
        }

        // Pattern 2: JAKARTA 18-02-1988 (space separated)
        const pattern2 = /^([A-Z\s]+)\s+(\d{2}[-\/]\d{2}[-\/]\d{4})/;
        const match2 = cleanedText.match(pattern2);
        if (match2) {
            console.log(`Pattern 2 matched: place="${match2[1].trim()}", date="${match2[2]}"`);
            return { place: match2[1].trim(), date: match2[2] };
        }

        // Pattern 3: Try to find any date and extract place before it
        const dateMatch = cleanedText.match(/(\d{2}[-\/]\d{2}[-\/]\d{4})/);
        if (dateMatch) {
            const dateIndex = cleanedText.indexOf(dateMatch[0]);
            const place = cleanedText.substring(0, dateIndex).replace(/[,\s]+$/, '').trim();
            console.log(`Pattern 3 matched: place="${place}", date="${dateMatch[0]}"`);
            return { place, date: dateMatch[0] };
        }

        console.log('No pattern matched');
        return { place: '', date: '' };
    };

    // Extract NIK
    result.nik = extractNIK() || findValue(['NIK', 'N I K']);

    // Extract Nama - be more flexible with the pattern
    const namaValue = findValue(['Nama', 'NAMA', 'Name']);
    if (namaValue) {
        // Remove any leading colons or spaces
        result.nama = namaValue.replace(/^[\s:]+/, '').trim();
    }

    // Extract Tempat/Tgl Lahir - Use a simpler, more direct approach
    console.log('=== EXTRACTING PLACE/DATE OF BIRTH ===');

    // Strategy 1: Look for common Indonesian cities directly in the text
    const cities = ['JAKARTA', 'BANDUNG', 'SURABAYA', 'MEDAN', 'SEMARANG', 'MAKASSAR', 'PALEMBANG', 'TANGERANG', 'DEPOK', 'BEKASI', 'BOGOR'];
    for (const city of cities) {
        const cityRegex = new RegExp(`\\b${city}\\b`, 'i');
        if (fullText.match(cityRegex)) {
            console.log(`Found city: ${city}`);
            result.tempatLahir = city;
            break;
        }
    }

    // Strategy 2: Extract date
    const dateMatch = fullText.match(/\b(\d{2}[-\/]\d{2}[-\/]\d{4})\b/);
    if (dateMatch) {
        result.tanggalLahir = dateMatch[1];
        console.log(`Found date: ${dateMatch[1]}`);
    }

    console.log(`Final result: place="${result.tempatLahir}", date="${result.tanggalLahir}"`);
    console.log('=====================================');

    // Extract Jenis Kelamin
    const jenisKelamin = findValue(['Jenis Kelamin', 'Jenis kelamin', 'JenisKelamin', 'Gender']);
    if (jenisKelamin.toLowerCase().includes('laki')) {
        result.jenisKelamin = 'MALE';
    } else if (jenisKelamin.toLowerCase().includes('perempuan')) {
        result.jenisKelamin = 'FEMALE';
    } else if (jenisKelamin.toLowerCase().includes('male')) {
        result.jenisKelamin = 'MALE';
    } else if (jenisKelamin.toLowerCase().includes('female')) {
        result.jenisKelamin = 'FEMALE';
    } else {
        result.jenisKelamin = jenisKelamin;
    }

    // Extract Gol. Darah
    let golDarah = findValue(['Gol Darah', 'Gol. Darah', 'GolDarah', 'Gol.Darah', 'Blood Type']);
    if (golDarah) {
        // Extract just the blood type letter(s): A, B, AB, or O
        const bloodMatch = golDarah.match(/\b(A|B|AB|O)\b/i);
        if (bloodMatch) {
            result.golDarah = bloodMatch[1].toUpperCase();
        } else {
            result.golDarah = golDarah;
        }
    }

    // Extract Alamat
    result.alamat = findValue(['Alamat', 'ALAMAT', 'Address']);

    // Extract RT/RW
    result.rtRw = findValue(['RT/RW', 'RT / RW', 'RTRW', 'RT RW']);

    // Extract Kel/Desa
    result.kelDesa = findValue(['Kel/Desa', 'Kel / Desa', 'Kelurahan/Desa', 'KelDesa', 'Kelurahan', 'Desa', 'Village']);

    // Extract Kecamatan
    result.kecamatan = findValue(['Kecamatan', 'KECAMATAN', 'District']);

    // Extract Agama
    result.agama = findValue(['Agama', 'AGAMA', 'Religion']);

    // Extract Status Perkawinan
    const statusPerkawinan = findValue(['Status Perkawinan', 'StatusPerkawinan', 'Status', 'Marital Status']);
    // Convert Indonesian to English
    if (statusPerkawinan.toLowerCase().includes('belum')) {
        result.statusPerkawinan = 'SINGLE';
    } else if (statusPerkawinan.toLowerCase().includes('kawin') && !statusPerkawinan.toLowerCase().includes('belum')) {
        result.statusPerkawinan = 'MARRIED';
    } else if (statusPerkawinan.toLowerCase().includes('cerai')) {
        result.statusPerkawinan = 'DIVORCED';
    } else {
        result.statusPerkawinan = statusPerkawinan;
    }

    // Extract Pekerjaan
    result.pekerjaan = findValue(['Pekerjaan', 'PEKERJAAN', 'Occupation']);

    // Extract Kewarganegaraan
    result.kewarganegaraan = findValue(['Kewarganegaraan', 'KEWARGANEGARAAN', 'Citizenship']) || 'WNI';

    // Extract Berlaku Hingga
    result.berlakuHingga = findValue(['Berlaku Hingga', 'BerlakuHingga', 'Berlaku', 'Valid Until']) || 'LIFETIME';

    return result;
}

export function cleanKTPData(data: KTPData): KTPData {
    const cleaned: KTPData = { ...data };

    // Clean each field
    Object.keys(cleaned).forEach((key) => {
        const value = cleaned[key as keyof KTPData];
        if (typeof value === 'string') {
            // Remove extra whitespace
            cleaned[key as keyof KTPData] = value.replace(/\s+/g, ' ').trim();
        }
    });

    return cleaned;
}
