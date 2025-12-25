import { Skeleton } from '@/components/atoms';
import { ArticleTemplate } from '@/components/templates';

export default function Loading() {
  return (
    <ArticleTemplate>
      <Skeleton variant="article" />
    </ArticleTemplate>
  );
}
