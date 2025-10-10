import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Wazir Cutlery - Premium Handcrafted Knives & Swords",
  description: "Discover the legacy of Wazirabad with Wazir Cutlery. We offer exquisite, handcrafted knives, collector swords, and professional chef cutlery, forged from high-carbon and Damascus steel by master artisans. Shop our collection of timeless, high-performance blades.",
  alternates: {
    canonical: 'https://wazircutlery.com/',
  },
  openGraph: {
    type: 'website',
    url: 'https://wazircutlery.com/',
    title: 'Wazir Cutlery - Premium Handcrafted Knives & Swords',
    description: 'Exquisite, handcrafted knives, swords, and chef cutlery forged from premium materials. Shop our collection of timeless, high-performance blades.',
    images: [
      {
        url: 'https://wazircutlery.com/og-home.png',
        width: 1200,
        height: 630,
        alt: 'A collection of handcrafted knives from Wazir Cutlery',
      },
    ],
    siteName: 'Wazir Cutlery',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@wazircutlery',
    creator: '@wazircutlery',
    title: 'Wazir Cutlery - Premium Handcrafted Knives & Swords',
    description: 'Exquisite, handcrafted knives, swords, and chef cutlery forged from premium materials. Shop our collection of timeless, high-performance blades.',
    images: ['https://wazircutlery.com/og-home.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://wazircutlery.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://wazircutlery.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
