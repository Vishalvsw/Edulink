import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react';

const PublicLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">EduLink</span>
              </Link>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/agent-signup" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                Become an Agent
              </Link>
              <div className="h-6 w-px bg-slate-300"></div>
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Log in
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply Now <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-200 px-4 pb-4 space-y-3">
                 <Link to="/agent-signup" className="block text-center w-full px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-slate-50">
                   Become an Agent
                 </Link>
                 <Link to="/login" className="block text-center w-full px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                   Log in
                 </Link>
                 <Link to="/courses" className="block text-center w-full px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                   Apply Now
                 </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 text-white mb-4">
                 <GraduationCap className="h-8 w-8 text-indigo-400" />
                 <span className="font-bold text-xl">EduLink</span>
              </div>
              <p className="text-slate-400 text-sm">
                Empowering students to find their dream careers through streamlined admission processes.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Services</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-slate-400 hover:text-white">Admissions</a></li>
                <li><a href="#" className="text-base text-slate-400 hover:text-white">Career Counseling</a></li>
                <li><a href="#" className="text-base text-slate-400 hover:text-white">College Finder</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-slate-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-base text-slate-400 hover:text-white">Agent Portal</a></li>
                <li><a href="#" className="text-base text-slate-400 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Contact</h3>
              <ul className="mt-4 space-y-4">
                <li className="text-base text-slate-400">Delhi, India</li>
                <li className="text-base text-slate-400">contact@edulink.com</li>
                <li className="text-base text-slate-400">+91 98765 43210</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8 md:flex md:items-center md:justify-between">
            <p className="text-base text-slate-400">&copy; 2024 VSW Data Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;