import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs' 
import { csCZ } from "@clerk/localizations";
import { ModalProvider } from "@/providers/modal-provider"
import { ToasterProvider } from '@/providers/toast-provider';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin - Nástěnka',
  description: 'Admin - nástěnka',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <ClerkProvider localization={csCZ}>
    <html lang="cs">
      <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
