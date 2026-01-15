'use client';

interface DateNavigatorProps {
    currentDate: string;
    onDateChange: (date: string) => void;
}

export default function DateNavigator({ currentDate, onDateChange }: DateNavigatorProps) {
    const goToPreviousDay = () => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - 1);
        onDateChange(date.toISOString().split('T')[0]);
    };

    const goToNextDay = () => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + 1);
        const today = new Date().toISOString().split('T')[0];
        const nextDate = date.toISOString().split('T')[0];

        // Don't allow navigating to future dates
        if (nextDate <= today) {
            onDateChange(nextDate);
        }
    };

    const goToToday = () => {
        const today = new Date().toISOString().split('T')[0];
        onDateChange(today);
    };

    const isToday = currentDate === new Date().toISOString().split('T')[0];

    return (
        <div className="flex items-center justify-center gap-4 py-6">
            <button
                onClick={goToPreviousDay}
                className="px-4 py-2 text-sm border border-black hover:bg-black hover:text-white transition-colors"
                aria-label="Previous day"
            >
                ←
            </button>

            <button
                onClick={goToToday}
                disabled={isToday}
                className="px-6 py-2 text-xs uppercase tracking-wider border border-gray-300 disabled:border-black disabled:bg-black disabled:text-white hover:border-black transition-colors"
            >
                Today
            </button>

            <button
                onClick={goToNextDay}
                disabled={isToday}
                className="px-4 py-2 text-sm border border-black hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
                aria-label="Next day"
            >
                →
            </button>
        </div>
    );
}
