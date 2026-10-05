import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CheckCircle, LayoutDashboard, ListChecks, PlusCircle, BarChart3, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/habits', label: 'My Habits', icon: ListChecks },
    { to: '/add-habit', label: 'Add Habit', icon: PlusCircle },
    { to: '/progress', label: 'Progress', icon: BarChart3 }
  ];

  // Close mobile menu on link click
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={handleLinkClick}>
          <div className="brand-icon-box" aria-hidden="true">
            <CheckCircle size={22} strokeWidth={2.5} />
          </div>
          <div className="brand-text">
            <span className="brand-title">HabitFlow</span>
            <span className="brand-tagline">Small habits. Better days.</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    <IconComponent size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav className="mobile-nav open" aria-label="Mobile Navigation">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={handleLinkClick}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
              >
                <IconComponent size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
