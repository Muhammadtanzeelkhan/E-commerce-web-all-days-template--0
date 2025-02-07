import React from 'react';
import Link from 'next/link';

interface WebsitePathProps {
  path?: string; // Optional path to display
}

const WebsitePath: React.FC<WebsitePathProps> = ({ path }) => {
  return (
    <div className="text-black py-8 tracking-[.3em] md:tracking-[.5em] font-medium text-xl">
      <Link href="/" passHref>
        <span className="text-[#9F9F9F] tracking-wider cursor-pointer">Home</span>
      </Link>
      {' > '}
      <Link href="/shop" passHref>
        <span className="text-[#9F9F9F] tracking-wider cursor-pointer">Shop</span>
      </Link>
      {' > | '}
      <span className="text-black tracking-wider">{path || 'Asgard Sofa'}</span>
    </div>
  );
};

export default WebsitePath;
