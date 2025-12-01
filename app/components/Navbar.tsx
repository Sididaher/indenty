'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const isAdminPage = pathname === '/admin'

  return (
    <nav className="navbar-custom">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="navbar-brand">
            <svg
              className="d-inline-block me-2"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Student Management System
          </div>
          <div className="d-flex align-items-center gap-3">
            {isAdminPage ? (
              <Link href="/" className="btn btn-light btn-sm">
                <svg
                  className="d-inline-block me-1"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
                Student Management
              </Link>
            ) : (
              <Link href="/admin" className="btn btn-light btn-sm">
                <svg
                  className="d-inline-block me-1"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
