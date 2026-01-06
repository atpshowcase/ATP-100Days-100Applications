import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flappy Bird Minimalist",
  description: "A minimalist Flappy Bird clone built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
