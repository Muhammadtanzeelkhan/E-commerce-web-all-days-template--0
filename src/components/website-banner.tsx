import React from 'react';
import Link from 'next/link';

interface WebsiteBannerProps {
  title: string; // The title to display on the banner
}

const WebsiteBanner: React.FC<WebsiteBannerProps> = ({ title }) => {
  return (
    <div className="min-h-screen relative flex-center w-screen py-8">
      {/* Background Image */}
      <img
        src="/images/main.png"
        className="absolute top-0 left-0 z-10 object-cover w-full h-full"
        alt="Main background banner"
      />

      {/* Banner Content */}
      <div className="absolute flex flex-col items-center justify-center z-40">
        {/* <img src="/images/mainLogo.png" className="object-cover" alt="Logo" /> */}
        <h1 className="text-[1.8em] sm:text-[2rem] md:text-[3rem] font-bold tracking-wide">
          {title}
        </h1>
        <nav aria-label="breadcrumb" className="tracking-[.6em] text-black text-[1em] md:text-[1.2em] font-medium">
          <span className="tracking-wider">
            <Link href="/">Home</Link>
          </span>{' '}
          &gt;{' '}
          <span className="tracking-wider text-black/70">{title}</span>
        </nav>
      </div>
    </div>
  );
};

export default WebsiteBanner;
