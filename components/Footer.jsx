import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-footer py-12 md:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto px-6 lg:px-9">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          {/* Logo Section */}
          <div className="flex-shrink-0 lg:w-1/4">
            <div className="mb-8">
              <Link href="/" className="flex items-center justify-center">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Image src="/footer-logo.svg" alt="Stag Horn Logo" width={143} height={58} />
                </div>
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="footer-heading font-medium text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><Link href="/" className="footer-link text-base">Home</Link></li>
                <li><Link href="/categories" className="footer-link text-base">Categories</Link></li>
                <li><Link href="/about" className="footer-link text-base">About Us</Link></li>
                <li><Link href="/blogs" className="footer-link text-base">Blog</Link></li>
                <li><Link href="/contact" className="footer-link text-base">Contact Us</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="footer-heading font-medium text-lg mb-6">Categories</h3>
              <ul className="space-y-4">
                <li><Link href="#" className="footer-link text-base">Knife</Link></li>
                <li><Link href="#" className="footer-link text-base">Axe</Link></li>
                <li><Link href="#" className="footer-link text-base">Swords</Link></li>
                <li><Link href="#" className="footer-link text-base">Spear</Link></li>
                <li><Link href="#" className="footer-link text-base">Ball</Link></li>
                <li><Link href="#" className="footer-link text-base">Mace Ball</Link></li>
                <li><Link href="#" className="footer-link text-base">Dagger</Link></li>
                <li><Link href="#" className="footer-link text-base">Hammer</Link></li>
                <li><Link href="#" className="footer-link text-base">Razer</Link></li>
                <li><Link href="#" className="footer-link text-base">Knuckle Brass</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
                <h3 className="footer-heading font-medium text-lg mb-6">Contact</h3>
                <div className="space-y-4">
                  <div>
                    <p className="footer-link text-base">Hassan Mughal:</p>
                    <Link href="https://wa.me/+923080601995" target="_blank" className="footer-link text-base">+923080601995</Link>
                  </div>
                  <div>
                    <p className="footer-link text-base">Qamar Shahzad:</p>
                    <Link href="https://wa.me/+923126209302" target="_blank" className="footer-link text-base">+923126209302</Link>
                  </div>
                </div>
            </div>
            {/* Special Section */}
            <div>
                <h3 className="footer-heading font-medium text-lg mb-6">Special</h3>
                <ul className="space-y-4">
                    <li><Link href="#" className="footer-link text-base">B2B Contract</Link></li>
                    <li><Link href="#" className="footer-link text-base">Customize Order</Link></li>
                </ul>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="pt-8 mb-8">
          <div className="flex items-center justify-center gap-3">
            <svg className="w-5 h-5 footer-text mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <p className="text-[#C0C0C0] text-base">Near, High Class Bakers G.T. Road, Wazirabad, Punjab, Pakistan</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#C0C0C0] pt-8 text-end">
          <p className="footer-text text-sm">
            © 2025 Stag Horn Cutlery works. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;