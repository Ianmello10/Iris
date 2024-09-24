import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/custom/footer";
import { baseUrl } from "./sitemap";
import { Inter } from 'next/font/google'


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Iris - Simple and Flexible Blog Template",
  description: "Generated by create next app",
  openGraph: {
  title: "Iris - Simple and Flexible Blog Template",
  description:'Íris is an open-source Markdown-based blog template built with Next.js and Shadcn UI.',
  type: "website",
	url: `${baseUrl}`,
  images: [
    {
      url: `${baseUrl}/og`,
      width: 1200,
      height: 630,
    },
  ],
    
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.className} antialiased `}>
      <body
      
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >     
        {children}
        </ThemeProvider>

        <Footer />
      </body>
    </html>
  );
}
