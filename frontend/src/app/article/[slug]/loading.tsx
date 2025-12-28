import { Skeleton, BackButton } from '@/components/atoms';
import { ArticleTemplate } from '@/components/templates';

export default function Loading() {
  return (
    <ArticleTemplate>
      <BackButton />
      <Skeleton variant="article" />
    </ArticleTemplate>
  );
}
