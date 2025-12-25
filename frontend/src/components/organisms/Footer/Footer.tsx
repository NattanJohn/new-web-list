import React from 'react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={className}>
      <p>© 2025 Gazeta News - Nattan John Lana da Silva</p>
    </footer>
  );
}
