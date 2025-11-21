"use client"

import { cn } from "@/lib/utils"
import { motion, type Variants } from "framer-motion"
import type React from "react"

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export function MotionSection({
  children,
  className,
  delay = 0,
  variant = "default",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: "default" | "fade" | "slideUp"
}) {
  const variants = 
    variant === "fade" ? fadeInVariants :
    variant === "slideUp" ? slideUpVariants :
    sectionVariants;

  return (
    <motion.section
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -100px 0px" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth easing
        delay 
      }}
    >
      {children}
    </motion.section>
  )
}
