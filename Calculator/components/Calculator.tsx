'use client'

import { useState } from 'react'

export default function Calculator() {
    const [currentValue, setCurrentValue] = useState<string>('0')
    const [previousValue, setPreviousValue] = useState<string>('')
    const [operation, setOperation] = useState<string>('')
    const [overwrite, setOverwrite] = useState<boolean>(true)

    const handleNumber = (num: string) => {
        if (overwrite) {
            setCurrentValue(num)
            setOverwrite(false)
        } else {
            if (num === '.' && currentValue.includes('.')) return
            setCurrentValue(currentValue === '0' ? num : currentValue + num)
        }
    }

    const handleOperator = (op: string) => {
        if (previousValue && currentValue && operation && !overwrite) {
            calculate()
        }

        setPreviousValue(currentValue)
        setOperation(op)
        setOverwrite(true)
    }

    const calculate = () => {
        if (!previousValue || !operation) return

        const prev = parseFloat(previousValue)
        const current = parseFloat(currentValue)
        let result = 0

        switch (operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '×':
                result = prev * current
                break
            case '÷':
                if (current === 0) {
                    setCurrentValue('Error')
                    setPreviousValue('')
                    setOperation('')
                    setOverwrite(true)
                    return
                }
                result = prev / current
                break
            case '%':
                result = prev % current
                break
            default:
                return
        }

        // Format the result to avoid floating point issues
        const formattedResult = parseFloat(result.toFixed(10)).toString()
        setCurrentValue(formattedResult)
        setPreviousValue('')
        setOperation('')
        setOverwrite(true)
    }

    const clear = () => {
        setCurrentValue('0')
        setPreviousValue('')
        setOperation('')
        setOverwrite(true)
    }

    const deleteDigit = () => {
        if (currentValue.length === 1 || currentValue === '0') {
            setCurrentValue('0')
        } else {
            setCurrentValue(currentValue.slice(0, -1))
        }
    }

    const toggleSign = () => {
        if (currentValue === '0') return
        setCurrentValue(
            currentValue.startsWith('-')
                ? currentValue.slice(1)
                : '-' + currentValue
        )
    }

    const handlePercent = () => {
        const current = parseFloat(currentValue)
        setCurrentValue((current / 100).toString())
    }

    const buttons = [
        { label: 'C', className: 'clear', onClick: clear },
        { label: '⌫', className: 'operator', onClick: deleteDigit },
        { label: '%', className: 'operator', onClick: handlePercent },
        { label: '÷', className: 'operator', onClick: () => handleOperator('÷') },

        { label: '7', className: '', onClick: () => handleNumber('7') },
        { label: '8', className: '', onClick: () => handleNumber('8') },
        { label: '9', className: '', onClick: () => handleNumber('9') },
        { label: '×', className: 'operator', onClick: () => handleOperator('×') },

        { label: '4', className: '', onClick: () => handleNumber('4') },
        { label: '5', className: '', onClick: () => handleNumber('5') },
        { label: '6', className: '', onClick: () => handleNumber('6') },
        { label: '-', className: 'operator', onClick: () => handleOperator('-') },

        { label: '1', className: '', onClick: () => handleNumber('1') },
        { label: '2', className: '', onClick: () => handleNumber('2') },
        { label: '3', className: '', onClick: () => handleNumber('3') },
        { label: '+', className: 'operator', onClick: () => handleOperator('+') },

        { label: '±', className: '', onClick: toggleSign },
        { label: '0', className: '', onClick: () => handleNumber('0') },
        { label: '.', className: '', onClick: () => handleNumber('.') },
        { label: '=', className: 'equals', onClick: calculate },
    ]

    return (
        <div className="calculator-wrapper">
            <div className="text-center mb-lg">
                <h1>Modern Calculator</h1>
                <p>A beautiful and functional calculator experience</p>
            </div>

            <div className="calculator-container">
                <div className="calculator-display">
                    <div className="display-previous">
                        {previousValue} {operation}
                    </div>
                    <div className="display-current">
                        {currentValue}
                    </div>
                </div>

                <div className="calculator-buttons">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={`calc-button ${button.className}`}
                            onClick={button.onClick}
                            aria-label={button.label}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="text-center mt-lg">
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Built with Next.js • Designed for Excellence
                </p>
            </div>
        </div>
    )
}
