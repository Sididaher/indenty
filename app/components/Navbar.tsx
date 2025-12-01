export default function Navbar() {
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
            <span className="text-white">
              <svg
                className="d-inline-block me-1"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Admin
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
