// app/articles/[id]/page.tsx

import { notFound } from 'next/navigation';

type TextSegment = {
  text: string;
  bold?: boolean;
};

type ContentBlock = {
  type: string;
  children: TextSegment[];
};

type Article = {
  id: number;
  documentId: string;
  Title: string;
  Content: ContentBlock[];
  Author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
};

export default async function ArticlePage({ params }: { params: { documentId: string } }) {
  const res = await fetch(`http://localhost:1337/api/articles/${params.documentId}`);
  if (!res.ok) {
    notFound(); // Use next/navigation to show a 404 page if the article is not found
  }

  const response = await res.json();
  const article: Article = response.data;
  return (
    <div>
      <h1>{article.Title}</h1>
      <p><strong>Author:</strong> {article.Author}</p>
      <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
      <div>
        {article?.Content?.map((block, index) => {
          if (block.type === 'paragraph') {
            return (
              <p key={index}>
                {block?.children.map((child, childIndex) => (
                  <span key={childIndex} style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                    {child.text}
                  </span>
                ))}
              </p>
            );
          }
          if (block.type === 'heading') {
            return <h3 key={index}>{block.children.map((child, childIndex) => (
              <span key={childIndex} style={{ fontWeight: child.bold ? 'bold' : 'normal' }}>
                {child.text}
              </span>
            ))}</h3>;
          }
          return null;
        })}
      </div>
    </div>
  );
}
