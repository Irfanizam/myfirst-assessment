"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    let title = "myFirst Assessment";
    if (pathname.startsWith("/blog")) {
      title = "myFirst Assessment · Blog";
    } else if (pathname.startsWith("/todo")) {
      title = "myFirst Assessment · To-Do List";
    }
    document.title = title;
  }, [pathname]);

  let headerTitle = "Application Hub";
  if (pathname.startsWith("/blog")) {
    headerTitle = "Blog";
  } else if (pathname.startsWith("/todo")) {
    headerTitle = "To-Do List";
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-50`}
      >
        <header className="w-full border-b border-gray-200 bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-800">{headerTitle}</h1>
            {pathname !== "/" && (
              <Link
                href="/"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                ← Home
              </Link>
            )}
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center">
          {children}
        </main>

        <footer className="mt-3 border-t border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
            <p>
              Developed by{" "}
              <span className="font-semibold text-gray-800">Irfan 💫</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
