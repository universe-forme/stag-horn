'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/categories', label: 'Categories' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact Us' },
    ];

    return (
        <nav className="bg-[#F9F9F6] nav-shadow py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="logo-antlers">
                            <Link href="/">
                                <Image src="/logo.svg" alt="Logo" width={96} height={64} />
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-link text-gray-500 font-medium ${pathname === link.href ? 'active text-gray-900' : ''}`}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Shopping Cart */}
                        <Link href="/cart">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Image src="/shopping-bag.svg" alt={"Shopping Bag Icon"} width={24} height={24} className="object-cover" />
                            </button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button className={`hamburger md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors ${isMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
                            <div className="flex flex-col space-y-1">
                                <span className="w-6 h-0.5 bg-gray-700 rounded-full"></span>
                                <span className="w-6 h-0.5 bg-gray-700 rounded-full"></span>
                                <span className="w-6 h-0.5 bg-gray-700 rounded-full"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu md:hidden fixed top-24 right-0 w-64 h-screen bg-white shadow-lg z-40 ${isMenuOpen ? 'open' : ''}`}>
                <div className="p-6 space-y-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block nav-link text-gray-500 font-medium text-lg ${pathname === link.href ? 'active text-gray-900' : ''}`}
                            onClick={toggleMobileMenu} // Close menu on link click
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {/*<div className={`mobile-overlay md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 ${isMenuOpen ? '' : 'hidden'}`} onClick={toggleMobileMenu}></div>*/}
        </nav>
    );
}
