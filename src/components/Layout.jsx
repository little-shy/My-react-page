import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-800 text-slate-100">

      {/* Navbar */}
      <nav className="bg-slate-700 border-b border-slate-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-slate-100 hover:text-indigo-300 transition"
          >
            My React Page
          </Link>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2">

            <Link
              to="/"
              className="px-3 sm:px-4 py-2 rounded-lg text-slate-200 hover:bg-slate-600 hover:text-white transition"
            >
              Home
            </Link>

            <Link
              to="/users"
              className="px-3 sm:px-4 py-2 rounded-lg text-slate-200 hover:bg-slate-600 hover:text-white transition"
            >
              Users
            </Link>

            <Link
              to="/posts"
              className="px-3 sm:px-4 py-2 rounded-lg text-slate-200 hover:bg-slate-600 hover:text-white transition"
            >
              Posts
            </Link>

          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 min-h-[calc(100vh-160px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-700 border-t border-slate-600 mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center">

          <p className="font-medium text-slate-300">
            © 2026 My React Page
          </p>

          <p className="text-sm text-slate-400 mt-1">
            Built with React, Tailwind CSS & shadcn/ui
          </p>

        </div>
      </footer>

    </div>
  );
}

export default Layout;

