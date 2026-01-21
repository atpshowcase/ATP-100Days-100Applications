import React from 'react';
import { currencies } from '@/lib/currencies';
import { ChevronDown } from 'lucide-react';
import styles from './CurrencyInput.module.css';

interface CurrencyInputProps {
    amount: number | string;
    currency: string;
    onAmountChange: (value: string) => void;
    onCurrencyChange: (value: string) => void;
    label: string;
    readOnly?: boolean;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
    amount,
    currency,
    onAmountChange,
    onCurrencyChange,
    label,
    readOnly
}) => {
    const selectedCurrency = currencies.find(c => c.code === currency);

    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputWrapper}>
                <div className={styles.selectGroup}>
                    <select
                        value={currency}
                        onChange={(e) => onCurrencyChange(e.target.value)}
                        className={styles.select}
                    >
                        {currencies.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.flag} {c.code}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className={styles.icon} />
                </div>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => onAmountChange(e.target.value)}
                    readOnly={readOnly}
                    className={styles.amountInput}
                    placeholder="0.00"
                />
                <span className={styles.symbol}>
                    {selectedCurrency?.symbol}
                </span>
            </div>
        </div>
    );
};
