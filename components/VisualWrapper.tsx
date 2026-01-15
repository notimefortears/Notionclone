"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function VisualWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-5xl mx-auto mt-16 px-6 pb-20"
    >
      <div className="glass-panel rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/20">
        {children}
      </div>
    </motion.div>
  );
}