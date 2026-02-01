"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Star, Users } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-surface dark">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-brand-500/10 border border-brand-500/20"
          >
            <Star className="w-4 h-4 mr-2 text-brand-400" fill="currentColor" />
            <span className="text-sm font-medium text-brand-300">
              Premium Appointments Made Simple
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
          >
            <span className="text-white">Book Your</span>
            <br />
            <span className="gradient-text">Next Experience</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mb-10 text-lg text-slate-400 md:text-xl"
          >
            Seamlessly schedule appointments with our automated booking system.
            Save time, avoid conflicts, and manage your calendar effortlessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/book"
              className="group flex items-center justify-center px-8 py-4 text-lg font-semibold text-dark-surface transition-all bg-brand-400 rounded-full hover:bg-brand-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(45,212,191,0.3)]"
            >
              Start Booking
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <button className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all bg-white/5 border border-white/10 rounded-full hover:bg-white/10 backdrop-blur-sm">
              <Calendar className="w-5 h-5 mr-2" />
              Check Availability
            </button>
          </motion.div>

          {/* Social Proof / Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 pt-10 border-t border-white/5 w-full max-w-4xl"
          >
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { label: "Active Users", value: "2k+" },
                { label: "Bookings", value: "15k+" },
                { label: "Rating", value: "4.9/5" },
                { label: "Support", value: "24/7" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-sm text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
