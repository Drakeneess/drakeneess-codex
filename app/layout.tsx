import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { PageTransition } from "../components/navigation/PageTransition";
import { AnimatedThemeBackground } from "../components/layout/AnimatedThemeBackground";

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
        <AnimatedThemeBackground />

        <div className="min-h-screen">
          <Navbar />

          <PageTransition>
            <main>{children}</main>
          </PageTransition>

          <Footer />
        </div>
      </body>
    </html>
  );
}