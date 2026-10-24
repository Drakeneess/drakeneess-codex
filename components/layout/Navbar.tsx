"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { href: "/stories", label: "Historias" },
  { href: "/codex", label: "Códice" },
  { href: "/archive", label: "Archivo" },
  { href: "/about", label: "Acerca de" },
];

export function Navbar() {
  return (
    <motion.header
      className="z-50 border-b border-[#6E1F35]/30 bg-[#07070A]/88"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="group flex items-center gap-4">
            <motion.div
              className="grid h-11 w-11 place-items-center rounded-full border border-[#8A2A45]/55 bg-[#141017] shadow-lg shadow-black/30 transition group-hover:border-[#D8D5CF]/45"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(110, 31, 53, 0)",
                  "0 0 24px rgba(110, 31, 53, 0.28)",
                  "0 0 0 rgba(110, 31, 53, 0)",
                ],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.06,
                rotate: -3,
              }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="codex-serif text-lg font-bold text-[#D8D5CF]">
                D
              </span>
            </motion.div>

            <div>
              <span className="block text-[0.62rem] uppercase tracking-[0.42em] text-[#8A2A45]">
                The
              </span>

              <span className="codex-serif text-xl font-semibold tracking-wide text-[#F1E9E0] transition group-hover:text-[#D86A89]">
                Drakeneess Codex
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.08 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={item.href}
                  className="group relative rounded-full px-4 py-2 text-sm text-[#A99CA3] transition hover:text-[#F1E9E0]"
                >
                  <span className="relative z-10">{item.label}</span>

                  <span className="absolute inset-0 scale-90 rounded-full border border-transparent bg-[#6E1F35]/0 opacity-0 transition duration-300 group-hover:scale-100 group-hover:border-[#8A2A45]/35 group-hover:bg-[#6E1F35]/12 group-hover:opacity-100" />
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>
      </div>

      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-[#8A2A45]/70 to-transparent"
        animate={{
          opacity: [0.35, 0.85, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.header>
  );
}
