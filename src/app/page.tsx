import { HomeTemplate } from '@/components/templates/HomeTemplate/HomeTemplate';
import { ArticleList } from '@/components/organisms/ArticleList/ArticleList';

export default function HomePage() {
  return (
    <HomeTemplate>
      <ArticleList />
    </HomeTemplate>
  );
}