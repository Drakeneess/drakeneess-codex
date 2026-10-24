import Link from "next/link";

const footerLinks = [
  { href: "/stories", label: "Historias" },
  { href: "/codex", label: "Códice" },
  { href: "/archive", label: "Archivo" },
  { href: "/about", label: "Acerca de" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#6E1F35]/30 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-white/10 pb-4 text-sm text-[#A99CA3]">
          Códice
        </div>

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
              <Link key={item.href} href={item.href} className="text-sm text-[#A99CA3]">
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
    </footer>
  );
}
