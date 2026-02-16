import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, GraduationCap, Building2, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="gradient-bg text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl font-bold">SkillBridge</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`hover:text-action-blue transition ${isActive('/') ? 'font-semibold' : ''}`}>
              Home
            </Link>
            <Link to="/browse" className={`hover:text-action-blue transition ${isActive('/browse') ? 'font-semibold' : ''}`}>
              Browse
            </Link>
            <Link to="/about" className={`hover:text-action-blue transition ${isActive('/about') ? 'font-semibold' : ''}`}>
              About
            </Link>
            <Link to="/contact" className={`hover:text-action-blue transition ${isActive('/contact') ? 'font-semibold' : ''}`}>
              Contact
            </Link>

            {user ? (
              <>
                {user.role === 'student' && (
                  <Link
                    to="/student/dashboard"
                    className={`hover:text-action-blue transition ${isActive('/student/dashboard') ? 'font-semibold' : ''}`}
                  >
                    <span className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </span>
                  </Link>
                )}
                {user.role === 'recruiter' && (
                  <Link
                    to="/recruiter/dashboard"
                    className={`hover:text-action-blue transition ${isActive('/recruiter/dashboard') ? 'font-semibold' : ''}`}
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Dashboard
                    </span>
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-action-blue transition">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="ml-4 px-4 py-2 bg-white text-deep-navy rounded-[12px] font-semibold hover:bg-slate-grey transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-action-blue transition">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-deep-navy rounded-[12px] font-semibold hover:bg-slate-grey transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-[12px] text-white hover:text-white hover:bg-deep-navy focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-90 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
        aria-hidden={!isOpen}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col h-full">
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center p-2 rounded-[12px] text-white hover:text-white hover:bg-deep-navy focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Close main menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Link
            to="/"
            className="block px-3 py-2 rounded-[12px] text-base font-medium text-gray-300 hover:text-white hover:bg-deep-navy"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/browse"
            className="block px-3 py-2 rounded-[12px] text-base font-medium text-gray-300 hover:text-white hover:bg-deep-navy"
            onClick={() => setIsOpen(false)}
          >
            Browse
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-[12px] text-base font-medium text-gray-300 hover:text-white hover:bg-deep-navy"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-[12px] text-base font-medium text-gray-300 hover:text-white hover:bg-deep-navy"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          {user ? (
            <>
              {user.role === 'student' && (
                <Link
                  to="/student/dashboard"
                  className="block px-3 py-2 rounded-[12px] text-base font-medium text-gray-300 hover:text-white hover:bg-deep-navy"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {user.role === 'recruiter' && (
                <Link
                  to="/recruiter/dashboard"
                  className="block px-3 py-2 rounded-[12px] text-base font-medium text-gray-300 hover:text-white hover:bg-deep-navy"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              )}
               {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 rounded-[12px] text-base font-medium text-gray-300 hover:text-white hover:bg-deep-navy"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-[12px] text-base font-medium text-gray-300 hover:text-white hover:bg-deep-navy"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-[12px] text-base font-medium text-gray-300 hover:text-white hover:bg-deep-navy"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-[12px] text-base font-medium text-gray-300 hover:text-white hover:bg-deep-navy"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar