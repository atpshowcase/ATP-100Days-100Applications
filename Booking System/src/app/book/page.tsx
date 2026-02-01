"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, ChevronLeft, ChevronRight, Clock, User, Sparkles } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

// Mock Data
const services = [
    {
        id: "consultation",
        title: "Initial Consultation",
        duration: "30 min",
        price: "$50",
        description: "A quick chat to discuss your needs and how we can help.",
        icon: User,
    },
    {
        id: "therapy",
        title: "Deep Dive Session",
        duration: "60 min",
        price: "$120",
        description: "In-depth analysis and strategy planning for your goals.",
        icon: Sparkles,
    },
    {
        id: "coaching",
        title: "Premium Coaching",
        duration: "90 min",
        price: "$200",
        description: "Intensive 1-on-1 coaching with actionable deliverables.",
        icon: Check,
    },
];

const timeSlots = [
    "09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"
];

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: "", email: "", notes: "" });

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const isStep1Valid = !!selectedService;
    const isStep2Valid = !!selectedDate && !!selectedTime;
    const isStep3Valid = formData.name && formData.email;

    const currentService = services.find(s => s.id === selectedService);

    return (
        <div className="min-h-screen bg-dark-surface text-foreground p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <header className="flex items-center justify-between mb-12">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">
                        Nexus<span className="text-brand-200">Book</span>
                    </Link>
                    <div className="text-sm text-slate-400">
                        Step {step} of 4
                    </div>
                </header>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-dark-card rounded-full mb-12 overflow-hidden">
                    <motion.div
                        className="h-full bg-brand-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold mb-6">Select a Service</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {services.map((service) => (
                                    <button
                                        key={service.id}
                                        onClick={() => setSelectedService(service.id)}
                                        className={clsx(
                                            "group p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden",
                                            selectedService === service.id
                                                ? "bg-brand-500/10 border-brand-500 shadow-[0_0_30px_rgba(45,212,191,0.15)]"
                                                : "bg-dark-card border-dark-border hover:border-brand-500/50 hover:bg-dark-card/80"
                                        )}
                                    >
                                        <div className={clsx(
                                            "p-3 rounded-xl inline-block mb-4 transition-colors",
                                            selectedService === service.id ? "bg-brand-500 text-white" : "bg-dark-surface text-brand-400 group-hover:bg-brand-500 group-hover:text-white"
                                        )}>
                                            <service.icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                        <p className="text-sm text-slate-400 mb-4">{service.description}</p>
                                        <div className="flex items-center justify-between text-sm font-medium">
                                            <span className="flex items-center text-slate-300"><Clock size={14} className="mr-1" /> {service.duration}</span>
                                            <span className="text-brand-300">{service.price}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-bold">Select Date & Time</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Date Selection (Mock) */}
                                <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center"><Calendar className="mr-2 text-brand-400" /> Date</h3>
                                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-slate-400">
                                        <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {/* Mock Calendar Days */}
                                        {Array.from({ length: 30 }, (_, i) => {
                                            const day = i + 1;
                                            const isSelected = selectedDate === `2024-02-${day}`;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedDate(`2024-02-${day}`)}
                                                    className={clsx(
                                                        "h-10 w-10 rounded-full flex items-center justify-center text-sm transition-all",
                                                        isSelected ? "bg-brand-500 text-white font-bold" : "hover:bg-brand-500/20 text-slate-300"
                                                    )}
                                                >
                                                    {day}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Time Selection */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center"><Clock className="mr-2 text-brand-400" /> Available Slots</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={clsx(
                                                    "py-3 px-4 rounded-xl border text-center text-sm font-medium transition-all",
                                                    selectedTime === time
                                                        ? "bg-brand-500 text-white border-brand-500"
                                                        : "bg-dark-card border-dark-border hover:border-brand-300 text-slate-300"
                                                )}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6 max-w-lg mx-auto"
                        >
                            <h2 className="text-3xl font-bold text-center">Your Details</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-600 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-600 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Notes (Optional)</label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-600 min-h-[100px] transition-all"
                                        placeholder="Any specific topics you want to cover?"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && currentService && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-md mx-auto bg-dark-card border border-dark-border rounded-3xl p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-400">
                                <Check size={40} />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
                            <p className="text-slate-400 mb-8">We've sent a confirmation email to {formData.email}.</p>

                            <div className="bg-dark-surface rounded-2xl p-6 mb-8 text-left space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Service</span>
                                    <span className="font-semibold text-white">{currentService.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Date</span>
                                    <span className="font-semibold text-white">{selectedDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Time</span>
                                    <span className="font-semibold text-white">{selectedTime}</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-dark-border">
                                    <span className="text-slate-500">Total</span>
                                    <span className="font-bold text-brand-400">{currentService.price}</span>
                                </div>
                            </div>

                            <Link
                                href="/"
                                className="block w-full py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition-colors"
                                onClick={() => setStep(1)} // Reset for demo purposes
                            >
                                Back to Home
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                {step < 4 && (
                    <div className="mt-12 flex justify-between">
                        <button
                            onClick={prevStep}
                            className={clsx(
                                "flex items-center px-6 py-3 rounded-xl font-medium transition-colors",
                                step === 1 ? "invisible" : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <ChevronLeft className="mr-2 w-5 h-5" /> Back
                        </button>

                        <button
                            onClick={nextStep}
                            disabled={
                                (step === 1 && !isStep1Valid) ||
                                (step === 2 && !isStep2Valid) ||
                                (step === 3 && !isStep3Valid)
                            }
                            className={clsx(
                                "flex items-center px-8 py-3 rounded-xl font-bold shadow-lg transition-all",
                                (
                                    (step === 1 && isStep1Valid) ||
                                    (step === 2 && isStep2Valid) ||
                                    (step === 3 && isStep3Valid)
                                )
                                    ? "bg-brand-500 hover:bg-brand-400 text-white shadow-brand-500/25 hover:scale-105"
                                    : "bg-dark-border text-slate-500 cursor-not-allowed"
                            )}
                        >
                            {step === 3 ? "Confirm Booking" : "Continue"} <ChevronRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
