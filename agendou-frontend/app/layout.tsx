import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { Toaster } from '@/components/providers/toaster'

import NextAuthSessionProvider from '@/components/providers/session-provider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Agendou',
  description: 'Agendamentos ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NextAuthSessionProvider>
          <main>{children}</main>
          <Toaster />
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
