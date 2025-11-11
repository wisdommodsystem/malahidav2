import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

export default function Layout({ children, title, description, keywords }: LayoutProps) {
  const siteTitle = title 
    ? `${title} | Wisdom Circle – Malahida`
    : 'Wisdom Circle – Malahida | Philosophy, Freethought & Amazigh Intellectual Culture';
  
  const siteDescription = description || 
    'A community dedicated to philosophy, freethought, atheism, rationalism, and Amazigh intellectual culture. Moroccan atheists, Amazigh philosophers, freethinkers, and rationalists.';
  
  const siteKeywords = keywords || 
    [
      // English
      'Malahida', 'Moroccan atheists', 'Amazigh', 'Amazigh philosophy', 'atheism', 'freethought', 'rationalism', 'secularism', 'individual freedoms', 'Wisdom Circle podcast', 'Discord community',
      // Arabic (script)
      'اللادينيين في المغرب', 'الملاحدة', 'الفكر الحر', 'العقلانية', 'العلمانية', 'الأمازيغية', 'الفلسفة الأمازيغية', 'الحريات الفردية', 'بودكاست ويسدوم سيركل', 'مجتمع ديسكورد',
      // Arabic transliteration (Latin)
      'Al-ladiniyyin fi al-Maghrib', 'Al-mulahida', 'Al-fikr al-hurr', 'Al-`aqlaniya', 'Al-`ilmaniya', 'Amazighiya', 'Al-falsafa al-Amazighiya', 'Al-hurriyat al-fardiya',
    ].join(', ');

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Wisdom Circle – Malahida" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Wisdom Circle – Malahida" />
        <meta property="og:image" content="https://i.postimg.cc/1X42P1sw/image.png" />
        <meta property="og:locale" content="ar_MA" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content="https://i.postimg.cc/1X42P1sw/image.png" />
        <link rel="icon" type="image/png" href="https://i.postimg.cc/1X42P1sw/image.png" />
        <link rel="apple-touch-icon" href="https://i.postimg.cc/1X42P1sw/image.png" />
        <link rel="mask-icon" href="https://i.postimg.cc/1X42P1sw/image.png" color="#0ea5e9" />
        <link rel="dns-prefetch" href="https://i.postimg.cc" />
        <link rel="preconnect" href="https://i.postimg.cc" />

        {/* Podcast & Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'PodcastSeries',
              name: 'Wisdom Circle – Malahida',
              description: 'A bilingual (Arabic-English) podcast covering freethought, atheism, rationalism, Amazigh culture, and individual freedoms in Morocco. Community discussions continue on Discord.',
              inLanguage: ['ar', 'en'],
              publisher: {
                '@type': 'Organization',
                name: 'Wisdom Circle – Malahida',
                areaServed: 'MA',
                keywords: siteKeywords,
              },
              image: 'https://i.postimg.cc/1X42P1sw/image.png',
              url: 'https://wisdom-circle.local',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Wisdom Circle – Malahida',
              description: 'Freethinkers, atheists, rationalists, and Amazigh intellectuals. Community on Discord and podcast for public philosophy and individual freedoms.',
              areaServed: 'MA',
              sameAs: [
                'https://discord.com',
              ],
              logo: 'https://i.postimg.cc/1X42P1sw/image.png',
            }),
          }}
        />
        {/* Fonts: Inter (UI), Poppins (headings), Merriweather (reading) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&family=Merriweather:wght@300;400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/** Ko-fi floating support widget (global across pages) */}
      {/** Load script client-side and draw once */}
      {typeof window !== 'undefined' && (
        (() => {
          // useEffect hook below will handle script injection and draw
          return null;
        })()
      )}
      {/** Initialize Ko-fi widget */}
      {/** We use useEffect to avoid SSR issues */}
      {/** and to ensure it loads once globally. */}
      {/** The widget shows a floating chat/button labeled in Arabic. */}
      {/** Handle: wisdom1 */}
      {/** Color: #00b9fe, position: right */}
      {/** Label: ادعَمنا ☕ */}
      {/** This ensures the support button exists on all pages. */}
      {
        // Initialize Ko-fi overlay widget
      }
      {(() => {
        // Hook defined inside component body
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (typeof window === 'undefined') return;
          const draw = () => {
            try {
              const kofi = (window as any).kofiWidgetOverlay;
              if (kofi && typeof kofi.draw === 'function') {
                kofi.draw('wisdom1', {
                  type: 'floating-chat',
                  position: 'right',
                  color: '#00b9fe',
                  label: 'ادعَمنا ☕',
                });
              }
            } catch {}
          };
          const existing = document.getElementById('kofi-overlay-script');
          if (!existing) {
            const s = document.createElement('script');
            s.id = 'kofi-overlay-script';
            s.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
            s.async = true;
            s.onload = () => draw();
            document.body.appendChild(s);
          } else {
            draw();
          }
        }, []);
        return null;
      })()}
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}

