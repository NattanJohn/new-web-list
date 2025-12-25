import React from 'react';
import { Title } from '@/components/atoms/Title/Title';

interface HeaderProps {
  className?: string;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ className, title = 'Gazeta News' }) => {
  return (
    <header className={className}>
      <Title tag="h1">{title}</Title>
    </header>
  );
}
