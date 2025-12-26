interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={className}>
      <p>© 2025 Gazeta News - Nattan John Lana da Silva</p>
    </footer>
  );
}
