import React from 'react';

interface UnderlineProps {
  title: string; // The text to be displayed with an underline
  underlineColor?: string; // Optional custom color for the underline
  className?: string; // Optional class for additional styling
}

const Underline: React.FC<UnderlineProps> = ({ title, underlineColor = 'black', className }) => {
  return (
    <div
      className={`text-2xl font-medium underline ${className} !underline-offset-[.5em]`}
      style={{ textDecorationColor: underlineColor }}
    >
      {title}
    </div>
  );
};

export default Underline;
