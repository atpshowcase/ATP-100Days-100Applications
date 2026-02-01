import { useState } from 'react'

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
  }

  function calculate() {
    setError('')
    setResult(null)
    if (!birthDate) {
      setError('Please select a birth date')
      return
    }
    const b = new Date(birthDate)
    const today = new Date()

    if (b > today) {
      setError('Birth date cannot be in the future')
      return
    }

    let years = today.getFullYear() - b.getFullYear()
    let months = today.getMonth() - b.getMonth()
    let days = today.getDate() - b.getDate()

    if (days < 0) {
      months -= 1
      const prevMonth = (today.getMonth() - 1 + 12) % 12
      const prevMonthYear = prevMonth === 11 ? today.getFullYear() - 1 : today.getFullYear()
      days += daysInMonth(prevMonthYear, prevMonth)
    }

    if (months < 0) {
      years -= 1
      months += 12
    }

    setResult({ years, months, days })
  }

  return (
    <div className="age-calculator">
      <div className="row">
        <label htmlFor="birth">Birth date</label>
        <input
          id="birth"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      <div className="row actions">
        <button onClick={calculate}>Calculate</button>
      </div>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <p><strong>Age:</strong></p>
          <p>{result.years} years, {result.months} months, {result.days} days</p>
        </div>
      )}

      <style jsx>{`
        .row { margin-bottom: 1rem; display:flex; flex-direction:column }
        label { margin-bottom: 0.5rem; font-weight:600 }
        input[type='date'] { padding: 0.5rem; border-radius:4px; border:1px solid #ddd }
        .actions { align-items:flex-start }
        button { background:#0070f3;color:#fff;border:0;padding:0.6rem 1rem;border-radius:6px;cursor:pointer }
        .error { color: #b00020 }
        .result { margin-top: 1rem; background: #f7f9fc; padding: 0.75rem; border-radius:6px }
      `}</style>
    </div>
  )
}
