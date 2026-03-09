import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CustomCursor } from "@/components/CustomCursor";
import InteractiveBackground from "@/components/InteractiveBackground";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Armatrix - The Future of Robotics",
  description: "Armatrix builds robotic arms for confined and hazardous spaces.",
};

import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/lib/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable, "dark h-full")}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-full`}
      >
        <CustomCursor />
        <InteractiveBackground />
        <SmoothScroll>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
