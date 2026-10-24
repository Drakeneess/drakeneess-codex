import Link from "next/link";

const navItems = [
  { href: "/stories", label: "Historias" },
  { href: "/codex", label: "Códice" },
  { href: "/archive", label: "Archivo" },
  { href: "/about", label: "Acerca de" },
];

export function Navbar() {
  return (
    <header className="border-b border-[#6E1F35]/30 bg-[#07070A]">
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-[#8A2A45]/55 bg-[#141017]">
              <span className="codex-serif text-lg font-bold text-[#D8D5CF]">
                D
              </span>
            </div>

            <div>
              <span className="block text-[0.62rem] uppercase tracking-[0.42em] text-[#8A2A45]">
                The
              </span>
              <span className="codex-serif text-xl font-semibold tracking-wide text-[#F1E9E0]">
                Drakeneess Codex
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-[#A99CA3]">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
