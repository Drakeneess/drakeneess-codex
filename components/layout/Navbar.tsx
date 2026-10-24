import Link from "next/link";

const navItems = [
  { href: "/stories", label: "Historias" },
  { href: "/codex", label: "Códice" },
  { href: "/archive", label: "Archivo" },
  { href: "/about", label: "Acerca de" },
];

export function Navbar() {
  return (
    <header className="relative z-10 border-b border-[#6E1F35]/35 bg-[#07070A]/95 shadow-[0_10px_32px_rgba(0,0,0,0.22)]">
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="group flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-[#8A2A45]/55 bg-[#141017] shadow-[0_0_20px_rgba(110,31,53,0.12)] transition-colors duration-200 group-hover:border-[#D8D5CF]/45">
              <span className="codex-serif text-lg font-bold text-[#D8D5CF]">D</span>
            </div>

            <div>
              <span className="block text-[0.62rem] uppercase tracking-[0.42em] text-[#8A2A45]">
                The
              </span>
              <span className="codex-serif text-xl font-semibold tracking-wide text-[#F1E9E0] transition-colors duration-200 group-hover:text-[#D86A89]">
                Drakeneess Codex
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-transparent px-4 py-2 text-sm text-[#A99CA3] transition-colors duration-200 hover:border-[#8A2A45]/35 hover:bg-[#6E1F35]/10 hover:text-[#F1E9E0]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#8A2A45]/65 to-transparent" />
    </header>
  );
}
