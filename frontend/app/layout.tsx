import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PwaProvider } from "@/contexts/PwaContext";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import "./globals.css";

const CommandPalette = dynamic(() => import("@/components/CommandPalette"));
const ShortcutCheatSheet = dynamic(() => import("@/components/ShortcutCheatSheet"));

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
  description: "Secure, high-performance precision manufacturing operating system.",
  manifest: "/manifest.json",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  keywords: ["precision engineering", "AS9100D", "CNC machining", "custom gears", "aerospace manufacturing", "manufacturing OS"],
  openGraph: {
    title: "PREMA — Engineering Intelligence Platform",
    description: "Secure, high-performance precision manufacturing operating system.",
    type: "website",
    locale: "en_US",
    siteName: "PREMA Manufacturing",
  },
  twitter: {
    card: "summary_large_image",
    title: "PREMA — Engineering Intelligence Platform",
    description: "Secure, high-performance precision manufacturing operating system.",
  },
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  var dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (dark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <SessionProvider>
          <ThemeProvider switchable={true} defaultTheme="dark">
            <PwaProvider>
              {children}
              <CommandPalette />
              <ShortcutCheatSheet />
              <Toaster position="bottom-right" richColors />
            </PwaProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
