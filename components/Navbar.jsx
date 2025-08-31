"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ isAdminLoggedIn = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu on resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle login click
  const handleLoginClick = (e) => {
    e.preventDefault();
    if (isAdminLoggedIn) {
      router.push('/admin');
    } else {
      router.push('/login');
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About Us" },
    { href: "#", label: "Login", onClick: handleLoginClick },
    // { href: "/blogs", label: "Blogs" },
    // { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-500 ease-in-out translate-y-0 opacity-100"
    >
      <nav className="w-full max-w-[1392px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[86px] px-6 justify-between items-center rounded-3xl border glass-bg backdrop-blur-navbar" style={{ borderColor: "#C0C0C0" }}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image src="/logo.svg" alt="Logo" width={96} height={96} />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation & CTA */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              link.onClick ? (
                <button
                  key={link.href}
                  onClick={link.onClick}
                  className="navbar-link"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`navbar-link${pathname === link.href ? " active" : ""}`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link href="/contact" className="bg-[#D6AF66] text-[#F9F9F6] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#D6AF66]/90 transition-colors duration-200">Contact Us</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              ref={buttonRef}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="p-2 text-[#C0C0C0] hover:text-[#D6AF66] transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {/* Menu Icon */}
              <svg className={`w-6 h-6 ${isMenuOpen ? "hidden" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              {/* Close Icon */}
              <svg className={`w-6 h-6 ${isMenuOpen ? "" : "hidden"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`lg:hidden mt-4 p-6 rounded-3xl border bg-[#F9F9F6] mobile-menu ${isMenuOpen ? "" : "hidden"}`}
          style={{ borderColor: "#C0C0C0" }}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map(link => (
              link.onClick ? (
                <button
                  key={link.href}
                  onClick={(e) => {
                    link.onClick(e);
                    setIsMenuOpen(false);
                  }}
                  className="navbar-link text-left"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`navbar-link${pathname === link.href ? " active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link href="/contact" className="bg-[#D6AF66] text-[#F9F9F6] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#D6AF66]/90 transition-colors duration-200 text-center mt-4" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
