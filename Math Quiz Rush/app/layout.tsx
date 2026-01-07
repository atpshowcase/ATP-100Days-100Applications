import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Math Quiz Rush",
    description: "Test your math skills under pressure. Match equations with correct answers as fast as you can!",
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
