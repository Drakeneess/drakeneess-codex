import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ThemeRuntimeProvider } from "../components/layout/ThemeRuntime";

export const metadata: Metadata = {
  title: "The Drakeneess Codex",
  description: "Un archivo vivo de historias imposibles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen font-sans antialiased">
        <ThemeRuntimeProvider>
          <div className="site-shell min-h-screen">
            <Navbar />
            <main className="site-main">{children}</main>
            <Footer />
          </div>
        </ThemeRuntimeProvider>
      </body>
    </html>
  );
}
