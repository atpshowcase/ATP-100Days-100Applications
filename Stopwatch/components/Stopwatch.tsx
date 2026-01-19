'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Stopwatch.module.css'

interface Lap {
    id: number
    time: number
    lapTime: number
}

export default function Stopwatch() {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState<Lap[]>([])
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const lastLapTimeRef = useRef(0)

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10)
            }, 10)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isRunning])

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000)
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        const ms = Math.floor((milliseconds % 1000) / 10)

        return {
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
            milliseconds: ms.toString().padStart(2, '0'),
        }
    }

    const handleStartStop = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setIsRunning(false)
        setTime(0)
        setLaps([])
        lastLapTimeRef.current = 0
    }

    const handleLap = () => {
        if (isRunning) {
            const lapTime = time - lastLapTimeRef.current
            setLaps((prevLaps) => [
                {
                    id: prevLaps.length + 1,
                    time: time,
                    lapTime: lapTime,
                },
                ...prevLaps,
            ])
            lastLapTimeRef.current = time
        }
    }

    const timeDisplay = formatTime(time)

    const getFastestLap = () => {
        if (laps.length === 0) return null
        return Math.min(...laps.map((lap) => lap.lapTime))
    }

    const getSlowestLap = () => {
        if (laps.length === 0) return null
        return Math.max(...laps.map((lap) => lap.lapTime))
    }

    const fastestLapTime = getFastestLap()
    const slowestLapTime = getSlowestLap()

    return (
        <div className={styles.container}>
            <div className={styles.stopwatchCard}>
                <h1 className={styles.title}>Stopwatch</h1>

                <div className={`${styles.timeDisplay} ${isRunning ? styles.running : ''}`}>
                    <div className={styles.timeSegment}>
                        <span className={styles.timeValue}>{timeDisplay.minutes}</span>
                        <span className={styles.timeLabel}>MIN</span>
                    </div>
                    <span className={styles.timeSeparator}>:</span>
                    <div className={styles.timeSegment}>
                        <span className={styles.timeValue}>{timeDisplay.seconds}</span>
                        <span className={styles.timeLabel}>SEC</span>
                    </div>
                    <span className={styles.timeSeparator}>:</span>
                    <div className={styles.timeSegment}>
                        <span className={styles.timeValue}>{timeDisplay.milliseconds}</span>
                        <span className={styles.timeLabel}>MS</span>
                    </div>
                </div>

                <div className={styles.controls}>
                    <button
                        onClick={handleStartStop}
                        className={`btn ${isRunning ? 'btn-secondary' : 'btn-success'} ${styles.controlBtn}`}
                    >
                        {isRunning ? (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                                Pause
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Start
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleLap}
                        disabled={!isRunning}
                        className={`btn btn-primary ${styles.controlBtn}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        Lap
                    </button>

                    <button
                        onClick={handleReset}
                        className={`btn ${styles.resetBtn}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                            <path d="M3 21v-5h5" />
                        </svg>
                        Reset
                    </button>
                </div>

                {laps.length > 0 && (
                    <div className={styles.lapsContainer}>
                        <h2 className={styles.lapsTitle}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 3h18v18H3zM12 8v8m-4-4h8" />
                            </svg>
                            Laps ({laps.length})
                        </h2>
                        <div className={styles.lapsList}>
                            {laps.map((lap) => {
                                const lapTimeFormatted = formatTime(lap.lapTime)
                                const totalTimeFormatted = formatTime(lap.time)
                                const isFastest = lap.lapTime === fastestLapTime && laps.length > 1
                                const isSlowest = lap.lapTime === slowestLapTime && laps.length > 1

                                return (
                                    <div
                                        key={lap.id}
                                        className={`${styles.lapItem} ${isFastest ? styles.fastest : ''} ${isSlowest ? styles.slowest : ''
                                            }`}
                                    >
                                        <div className={styles.lapNumber}>
                                            <span className={styles.lapLabel}>Lap</span>
                                            <span className={styles.lapId}>{lap.id}</span>
                                        </div>
                                        <div className={styles.lapTimes}>
                                            <div className={styles.lapTime}>
                                                <span className={styles.lapTimeLabel}>Lap Time</span>
                                                <span className={styles.lapTimeValue}>
                                                    {lapTimeFormatted.minutes}:{lapTimeFormatted.seconds}.
                                                    {lapTimeFormatted.milliseconds}
                                                </span>
                                            </div>
                                            <div className={styles.totalTime}>
                                                <span className={styles.totalTimeLabel}>Total</span>
                                                <span className={styles.totalTimeValue}>
                                                    {totalTimeFormatted.minutes}:{totalTimeFormatted.seconds}.
                                                    {totalTimeFormatted.milliseconds}
                                                </span>
                                            </div>
                                        </div>
                                        {isFastest && (
                                            <div className={styles.badge}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                                Fastest
                                            </div>
                                        )}
                                        {isSlowest && (
                                            <div className={`${styles.badge} ${styles.slowestBadge}`}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                </svg>
                                                Slowest
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
