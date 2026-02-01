import { useEffect, useState } from 'react'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Clock() {
  // Initialize to null so server and client initial HTML match and avoid hydration mismatches
  const [now, setNow] = useState(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // While 'now' is null (server render and before first client effect), show a stable placeholder
  if (!now) {
    return (
      <div className="clock">
        <div className="title">Digital Clock</div>
        <div className="time">--:--:--</div>
        <div className="date">Loading…</div>
      </div>
    )
  }

  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hour12 = hours % 12 === 0 ? 12 : hours % 12

  const timeString = `${pad(hour12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`
  const dateString = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="clock">
      <div className="title">Digital Clock</div>
      <div className="time" aria-live="polite">{timeString}</div>
      <div className="date">{dateString}</div>
    </div>
  )
}
