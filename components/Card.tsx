import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default Card;
