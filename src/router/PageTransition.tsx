import { AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from 'framer-motion';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};