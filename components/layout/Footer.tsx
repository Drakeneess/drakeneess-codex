"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/stories", label: "Historias" },
  { href: "/codex", label: "Códice" },
  { href: "/archive", label: "Archivo" },
  { href: "/about", label: "Acerca de" },
];

export function Footer() {
  return (
    <motion.footer
      className="border-t border-[#6E1F35]/30 px-6 py-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="victorian-divider mb-8"
          animate={{
            opacity: [0.45, 1, 0.45],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span>Códice</span>
        </motion.div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="codex-serif text-2xl font-semibold text-[#F1E9E0]">
              The Drakeneess Codex
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#A99CA3]">
              Un archivo vivo de historias imposibles, notas prohibidas y mundos
              que se niegan a comportarse como documentos normales.
            </p>
          </div>

          <nav className="flex flex-wrap gap-4">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#A99CA3] transition hover:text-[#D86A89]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[#7E7379] md:flex-row md:items-center md:justify-between">
          <p>© The Drakeneess Codex</p>
          <p>Escrito con tinta, renderizado en código y maldecido por bugs de layout.</p>
        </div>
      </div>
    </motion.footer>
  );
}