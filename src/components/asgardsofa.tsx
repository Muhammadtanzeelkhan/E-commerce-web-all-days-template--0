import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const asgardSofa: React.FC = () => {
  return (
    <div className="min-h-[70vh] w-screen md:flex items-center justify-center px-6 md:px-8 lg:px-12 py-1 bg-[#FFF9E5]">
      {/* Image Section */}
      <section className="md:w-[60%]">
        <img src="/images/AsgardSofa.png" alt="Asgard Sofa" className="w-full h-auto object-cover" />
      </section>

      {/* Content Section */}
      <section className="flex flex-col gap-4 items-center py-[3em] justify-center md:w-[40%]">
        <h3 className="font-medium text-[1.1em] tracking-wider text-center md:text-2xl">
          New Arrivals
        </h3>
        <h1 className="font-[800] tracking-widest text-[2em] sm:text-[2.2em] md:text-[2.6em]">
          Asgard Sofa
        </h1>
        <Link href="/SingleProduct/14">
          <Button
            title="Order Now"
            className="font-medium text-[.9em] px-6 md:px-[2.5em] py-3 border border-black tracking-wide md:text-lg"
          />
        </Link>
      </section>
    </div>
  );
};

export default asgardSofa;