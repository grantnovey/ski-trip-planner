import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ski Trip Planner",
  description: "Track and manage your ski trip expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: "Figtree, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
