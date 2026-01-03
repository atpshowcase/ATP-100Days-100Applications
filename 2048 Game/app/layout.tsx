import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "2048 Game - Minimalist Design",
    description: "A beautiful minimalist version of the classic 2048 game built with Next.js",
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
