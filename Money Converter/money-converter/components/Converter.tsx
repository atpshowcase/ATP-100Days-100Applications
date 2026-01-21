"use client";

import React, { useState, useEffect } from 'react';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { CurrencyInput } from './CurrencyInput';
import { ArrowUpDown, RefreshCw, Sparkles } from 'lucide-react';
import styles from './Converter.module.css';

export default function Converter() {
    const [amount, setAmount] = useState<string>('1');
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('EUR');

    const { rates, loading, error, lastUpdated } = useExchangeRates(fromCurrency);
    const [convertedAmount, setConvertedAmount] = useState<string>('');

    useEffect(() => {
        if (rates && rates[toCurrency]) {
            const rate = rates[toCurrency];
            const val = parseFloat(amount);
            if (!isNaN(val)) {
                setConvertedAmount((val * rate).toFixed(2));
            } else {
                setConvertedAmount('');
            }
        }
    }, [amount, fromCurrency, toCurrency, rates]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setAmount(convertedAmount); // Optional: preserve value flow or just swap currencies
    };

    const formatRate = (rate: number) => {
        return `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    };

    if (loading && !rates) {
        return (
            <div className={`glass-panel ${styles.card}`}>
                <div className={styles.loading}>
                    <RefreshCw className="animate-spin" size={32} />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`glass-panel ${styles.card}`}>
                <div className={styles.error}>
                    Error loading rates: {error}
                </div>
            </div>
        );
    }

    return (
        <div className={`glass-panel animate-fade-in ${styles.card}`}>
            <div className={styles.header}>
                <div className={styles.headerIconContainer}>
                    <Sparkles size={24} />
                </div>
                <h1 className={styles.title}>Money Converter</h1>
                <p className={styles.subtitle}>Real-time exchange rates</p>
            </div>

            <CurrencyInput
                label="You pay"
                amount={amount}
                currency={fromCurrency}
                onAmountChange={setAmount}
                onCurrencyChange={setFromCurrency}
            />

            <div className={styles.swapContainer}>
                <button className={styles.swapButton} onClick={handleSwap} title="Swap currencies">
                    <ArrowUpDown size={20} />
                </button>
            </div>

            <CurrencyInput
                label="You receive"
                amount={convertedAmount}
                currency={toCurrency}
                onAmountChange={() => { }} // Read only flow for now
                onCurrencyChange={setToCurrency}
                readOnly
            />

            <div className={styles.resultInfo}>
                <div className={styles.exchangeRate}>
                    <span className={styles.rateLabel}>Exchange Rate</span>
                    <span className={styles.rateValue}>
                        {rates && rates[toCurrency] ? formatRate(rates[toCurrency]) : '...'}
                    </span>
                </div>
            </div>

            {lastUpdated && (
                <div className={styles.lastUpdated}>
                    Last updated: {new Date(lastUpdated).toLocaleString()}
                </div>
            )}
        </div>
    );
}
