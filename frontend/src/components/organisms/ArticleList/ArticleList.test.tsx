import React from "react";
import { render, screen } from "@testing-library/react";

type NamedFC<P = Record<string, never>> = React.FC<P> & { displayName: string };

const mockArticles = [
  {
    slug: "test-1",
    title: "First Article",
    summary: "Summary 1",
    date: "2025-12-24",
    image: "https://picsum.photos/seed/1/400/200",
  },
  {
    slug: "test-2",
    title: "Second Article",
    summary: "Summary 2",
    date: "2025-12-23",
    image: "https://picsum.photos/seed/2/400/200",
  },
];

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: jest.fn(),
});

// Mock Next.js navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
    toString: jest.fn(() => ""),
  })),
}));

jest.mock("@/services/api", () => ({
  api: {
    getArticles: jest.fn().mockResolvedValue(mockArticles),
  },
  ApiError: class ApiError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ApiError";
    }
  },
}));

jest.mock("next/link", () => {
  const LinkMock: NamedFC<{ children: React.ReactNode; href: string }> = ({ children, href }) => (
    <a href={href}>{children}</a>
  );
  LinkMock.displayName = "LinkMock";
  return LinkMock;
});

jest.mock("../../molecules/PostCard/PostCard", () => {
  const PostCard: NamedFC<{ title?: string; summary?: string }> = ({ title, summary }) => (
    <div data-testid="post-card">
      <h2>{title ?? "Untitled"}</h2>
      <p>{summary ?? ""}</p>
    </div>
  );
  PostCard.displayName = "PostCardMock";
  return { PostCard };
});

jest.mock("../../atoms", () => {
  const Pagination: NamedFC = () => <div data-testid="pagination">Pagination</div>;
  const SkeletonList: NamedFC = () => <div data-testid="skeleton-list">Loading...</div>;
  Pagination.displayName = "PaginationMock";
  SkeletonList.displayName = "SkeletonListMock";
  return { Pagination, SkeletonList };
});

import { ArticleList } from "./ArticleList";

describe("ArticleList", () => {
  it("renders articles after loading", async () => {
    render(<ArticleList initialArticles={mockArticles} />);

    const postCards = screen.getAllByTestId("post-card");
    expect(postCards).toHaveLength(2);
  });

  it("renders pagination component", async () => {
    const moreArticles = Array.from({ length: 7 }).map((_, i) => ({
      slug: `test-${i + 1}`,
      title: `Article ${i + 1}`,
      summary: `Summary ${i + 1}`,
      date: "2025-12-20",
      image: `https://picsum.photos/seed/${i + 1}/400/200`,
    }));

    render(<ArticleList initialArticles={moreArticles} />);

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });
});
