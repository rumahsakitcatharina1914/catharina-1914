import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Script from "next/script"

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-serif'
})

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-sans'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#005ba3',
}

export const metadata: Metadata = {
  title: 'Rumah Sakit Catharina 1914 | Pelayanan Kesehatan Terpercaya',
  description: 'Rumah Sakit Catharina 1914 menyediakan pelayanan kesehatan berkualitas dengan dokter spesialis, fasilitas modern, dan perawatan terbaik untuk Anda dan keluarga.',
  keywords: 'rumah sakit, kesehatan, dokter, perawatan medis, IGD, rawat inap, Catharina',
  generator: 'Next.js',
  applicationName: 'Rumah Sakit Catharina 1914',
  referrer: 'strict-origin-when-cross-origin',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://catharina1914.com',
    siteName: 'Rumah Sakit Catharina 1914',
    title: 'Rumah Sakit Catharina 1914',
    description: 'Pelayanan kesehatan berkualitas sejak 1914',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${lato.variable}`}>
      <body className={`overflow-x-hidden font-sans antialiased bg-background text-foreground`}>
        {children}
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
        />
        <Analytics />
      </body>
    </html>
  )
}
