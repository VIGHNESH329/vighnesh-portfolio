import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import TransitionOverlay from '@/components/ui/TransitionOverlay';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deepak Sai Vighnesh | Portfolio",
  description: "Cinematic Dual-Identity Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      data-identity="cyber"
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <TransitionOverlay />
        {children}
      </body>
    </html>
  );
}
