'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function WhatsAppIcon() {
  return (
    <Link href="https://wa.me/+923080601995" target="_blank" rel="noopener noreferrer" className="whatsapp-icon-container">
      <div className="whatsapp-text">
        Contact Us on WhatsApp now &#x21;
      </div>
      <div className="whatsapp-icon">
        <Image src="/whatsapp.png" alt="WhatsApp" width={48} height={48} />
      </div>
    </Link>
  );
}
