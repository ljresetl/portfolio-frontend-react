import { motion } from "framer-motion";
import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string; // 👈 додали className
}

const Section: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <motion.div
      className={className} // 👈 тепер можна передавати стилі
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Section;
