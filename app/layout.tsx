import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PREMA — Engineering Intelligence Platform",
  description: "Secure precision manufacturing operating system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
