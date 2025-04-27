import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className} ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow duration-300' : ''}`}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="p-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;