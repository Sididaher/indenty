import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Management System | Modern Dashboard",
  description: "A modern and professional student management system built with Next.js and Supabase",
  keywords: ["student management", "dashboard", "education", "Next.js", "Supabase"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
