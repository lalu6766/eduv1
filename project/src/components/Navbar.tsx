import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Home, MessageSquare, BookOpen, Newspaper, Mail, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-6 w-6" /> },
    { name: 'Forum', path: '/forum', icon: <MessageSquare className="h-6 w-6" /> },
    { name: 'Resources', path: '/resources', icon: <BookOpen className="h-6 w-6" /> },
    { name: 'Blog', path: '/blog', icon: <Newspaper className="h-6 w-6" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="h-6 w-6" /> },
  ];

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 h-full w-64 bg-[#121212] text-white p-6 flex-col">
        <Link to="/" className="flex items-center space-x-2 mb-8">
          <GraduationCap className="h-10 w-10 text-green-500" />
          <span className="text-2xl font-bold">Eduverse</span>
        </Link>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-[#282828] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#282828]'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 bg-[#121212] p-4 z-50 md:hidden flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-green-500" />
          <span className="text-xl font-bold">Eduverse</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-400 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#121212] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold">Eduverse</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-white focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-[#282828] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#282828]'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}