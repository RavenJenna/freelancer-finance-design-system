import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

/*
 * Inter — UI / body font.
 * Exposed as --ff-sans; globals.css maps it to --font-sans for Tailwind.
 */
const inter = Inter({
  variable: '--ff-sans',
  subsets: ['latin'],
  display: 'swap',
})

/*
 * Space Grotesk — display / heading font.
 * Also used for financial figures via .font-numeric (great tnum support).
 * Exposed as --ff-display; globals.css maps it to --font-display for Tailwind.
 */
const spaceGrotesk = Space_Grotesk({
  variable: '--ff-display',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Freelancer Finance Design System',
  description: 'Component library and design tokens for the Freelancer Finance app',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
