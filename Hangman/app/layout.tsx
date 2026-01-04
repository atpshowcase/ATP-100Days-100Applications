import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Hangman Game - Modern & Interactive",
    description: "Play the classic Hangman game with a modern, beautiful interface",
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
