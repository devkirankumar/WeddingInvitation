import type { Metadata, Viewport } from "next";
import { wedding } from "@/config/wedding";
import { InvitationProvider } from "@/components/InvitationProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(wedding.site.url),
  title: wedding.site.title,
  description: wedding.site.description,
  applicationName: wedding.site.title,
  openGraph: {
    type: "website",
    title: wedding.site.title,
    description: wedding.site.description,
    locale: wedding.site.locale.replace("-", "_"),
    siteName: wedding.site.title,
  },
  twitter: {
    card: "summary_large_image",
    title: wedding.site.title,
    description: wedding.site.description,
  },
  robots: { index: false, follow: false }, // private invitation — keep out of search results
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fdfbf7",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Great+Vibes&family=Montserrat:wght@500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
          >
            Skip to invitation
          </a>
          <InvitationProvider>{children}</InvitationProvider>
        </body>
      </html>
      );
}
