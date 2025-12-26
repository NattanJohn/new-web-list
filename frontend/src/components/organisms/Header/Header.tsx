import { Title } from '@/components/atoms/Title/Title';

interface HeaderProps {
  className?: string;
  title?: string;
  headingLevel?: 'h1' | 'h2' | 'h3';
}

export const Header = ({ className, title = 'Gazeta News', headingLevel = 'h1' }: HeaderProps) => {
  return (
    <header className={className}>
      <Title tag={headingLevel}>{title}</Title>
    </header>
  );
}
