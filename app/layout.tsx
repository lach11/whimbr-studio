import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/github-dark.css";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whimbr.studio"),
  title: "Whimbr Studio — Curious tools, thoughtfully made.",
  description: "Independent experiments in useful software, playful electronics, expressive data and practical learning.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: { title: "Whimbr Studio", description: "Curious tools, thoughtfully made.", images: ["/og.png"], type: "website" },
  twitter: { card: "summary_large_image", title: "Whimbr Studio", description: "Curious tools, thoughtfully made.", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${display.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
