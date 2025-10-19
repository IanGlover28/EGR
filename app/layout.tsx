import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Evergreen Remedy Ghana - Forever Arctic Sea Kids Brain Booster',
  description: 'Help your child learn faster, remember better & excel in school with Forever Arctic Sea - Premium Omega-3, DHA & EPA supplement for growing children.',
  icons: {
    icon: '/egr-logo.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}