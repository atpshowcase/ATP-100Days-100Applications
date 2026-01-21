import { useState, useEffect } from 'react';

interface RatesData {
    base_code: string;
    rates: Record<string, number>;
    time_last_update_utc: string;
}

export function useExchangeRates(baseCode: string) {
    const [rates, setRates] = useState<Record<string, number> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://open.er-api.com/v6/latest/${baseCode}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch exchange rates');
                }
                const data: RatesData = await response.json();
                setRates(data.rates);
                setLastUpdated(data.time_last_update_utc);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, [baseCode]);

    return { rates, loading, error, lastUpdated };
}
