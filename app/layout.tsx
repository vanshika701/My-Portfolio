import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vanshika Srivastava — Portfolio",
  description:
    "Full-Stack Developer · Security Researcher · ML Engineer. B.Tech CSE at Shiv Nadar University.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="pink">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700&family=Jost:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
