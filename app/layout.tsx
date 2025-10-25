import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import GlobalLoader from "@/components/layout/GlobalLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EMS Admin Portal",
  description: "Employee Management System for HR and Admin teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased bg-(--color-background) text-(--color-text)`}
      >
        <AuthProvider>
          <GlobalLoader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
