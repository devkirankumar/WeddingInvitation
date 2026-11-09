"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.3 } } };
const child: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } },
};

/** Container that reveals its <Item> children one after another — the reference's slow ink-in. */
export function Stagger({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={container} {...rest}>
      {children}
    </motion.div>
  );
}

export function Item({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={child} {...rest}>
      {children}
    </motion.div>
  );
}

/** Stand-alone fade + rise. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
