"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const onLogin = () => router.push("/login");
  const onLogout = () => { logout(); router.push("/"); };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-gray-900">CPM</span>
            <span className="hidden md:inline text-sm font-medium text-gray-500">
              Beauty Product Lifecycle Tracker
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/features"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              Features
            </Link>

            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              Pricing
            </Link>

            {!isAuthenticated && (
              <Link
                href="/signup"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
              >
                Sign up
              </Link>
            )}

            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="px-6 py-2 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onLogin}
                className="px-6 py-2 rounded-full bg-lime-400 text-gray-900 text-sm font-bold hover:bg-lime-500 transition shadow-sm"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/features"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-gray-700"
            >
              Features
            </Link>

            <Link
              href="/pricing"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-gray-700"
            >
              Pricing
            </Link>

            {!isAuthenticated && (
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium text-gray-700"
              >
                Sign up
              </Link>
            )}

            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout?.();
                }}
                className="w-full py-2 rounded-full bg-gray-900 text-white text-sm font-bold"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogin?.();
                }}
                className="w-full py-2 rounded-full bg-lime-400 text-gray-900 text-sm font-bold"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
