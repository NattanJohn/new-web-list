import { Skeleton } from './Skeleton';
import React from 'react';

export const SkeletonList = ({ count = 6 }: { count?: number }) => {
  return (
    <section aria-label="Lista de skeletons">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1rem' }}
        >
          <Skeleton height="200px" width="100%" />
          <Skeleton height="14px" width="30%" />
          <Skeleton height="28px" width="85%" />
          <Skeleton height="60px" width="100%" />
        </div>
      ))}
    </section>
  );
};

export default SkeletonList;
