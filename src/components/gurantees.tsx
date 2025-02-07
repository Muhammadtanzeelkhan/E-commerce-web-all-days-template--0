import React from 'react';

interface GuarantyCardProps {
  title: string;
  desc: string;
}

const GuarantyCard: React.FC<GuarantyCardProps> = ({ title, desc }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-2xl md:text-3xl tracking-wider font-semibold">{title}</h1>
      <p
        className="text-[.9em] md:text-[1.2em] font-medium tracking-wide text-[#4F4F4F]"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
    </div>
  );
};

interface Guarantee {
  title: string;
  desc: string;
}

const Gurantees: React.FC = () => {
  const guarantees: Guarantee[] = [
    { title: 'Free Delivery', desc: 'For all orders over $50 , consectetur <br/> adipim scing elit' },
    { title: '90 Days Return', desc: 'If goods have problems, consectetur <br/> adipim scing elit' },
    { title: 'Secure Payment', desc: '100% secure payment , consectetur <br/> adipim scing elit' },
  ];

  return (
    <div className="px-[2em] w-full flex-between gap-x-[1em] gap-y-[2rem] mt-[3rem] py-[3rem] md:py-[5rem] flex-wrap bg-[#FAF4F4]">
      {guarantees.map((guarantee, index) => (
        <GuarantyCard key={index} title={guarantee.title} desc={guarantee.desc} />
      ))}
    </div>
  );
};

export default Gurantees;
