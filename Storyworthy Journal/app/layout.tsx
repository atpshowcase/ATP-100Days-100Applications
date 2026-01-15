import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Storyworthy Journal",
  description: "One sentence a day to capture your story",
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
