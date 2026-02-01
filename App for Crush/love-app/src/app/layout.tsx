import type { Metadata } from "next";
import { Dancing_Script, Outfit } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-dancing",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Untuk Kamu ❤️",
  description: "Ada pesan spesial nih buat kamu...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${outfit.className} ${dancingScript.variable}`}>
        {children}
      </body>
    </html>
  );
}
