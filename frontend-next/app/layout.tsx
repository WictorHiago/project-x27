import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project X27 - Inventory Management",
  description: "A modern inventory management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center justify-center h-16 border-b">
                <h1 className="text-xl font-bold text-gray-800">Project X27</h1>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/products"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/categories"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/warehouses"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Warehouses
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t">
                <p className="text-sm text-gray-600 text-center">
                  2024 Project X27
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
