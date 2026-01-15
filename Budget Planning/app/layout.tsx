import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Budget Planner - Financial Planning",
  description: "A minimalist budget planning application for managing personal finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
