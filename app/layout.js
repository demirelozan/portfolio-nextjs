import './globals.css'

export const metadata = {
  title: 'Ozan Demirel - Composer',
  description: 'Film, Game & Media Composer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}