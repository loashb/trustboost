// File: src/app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // <-- 1. IMPORT THE TOASTER

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TrustBoost",
  description: "AI-Powered Review Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. ADD THE TOASTER COMPONENT HERE */}
        {/* This component is invisible until you call toast() */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}