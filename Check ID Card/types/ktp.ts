export interface KTPData {
    nik: string;
    nama: string;
    tempatLahir: string;
    tanggalLahir: string;
    jenisKelamin: string;
    golDarah: string;
    alamat: string;
    rtRw: string;
    kelDesa: string;
    kecamatan: string;
    agama: string;
    statusPerkawinan: string;
    pekerjaan: string;
    kewarganegaraan: string;
    berlakuHingga: string;
}

export const emptyKTPData: KTPData = {
    nik: '',
    nama: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    golDarah: '',
    alamat: '',
    rtRw: '',
    kelDesa: '',
    kecamatan: '',
    agama: '',
    statusPerkawinan: '',
    pekerjaan: '',
    kewarganegaraan: '',
    berlakuHingga: '',
};
