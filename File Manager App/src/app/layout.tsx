import '../styles/globals.css';

export const metadata = {
  title: 'File Manager App',
  description: 'A simple file manager built with Next.js and Tailwind CSS v3',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
