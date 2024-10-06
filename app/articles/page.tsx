// app/page.tsx
import Link from 'next/link';
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
export default async function About() {
  const res = await fetch('http://localhost:1337/api/articles');

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }

  const articles = await res.json(); // Assuming you fetch and shape the data correctly
  return (
    <>
      <h1>Articles</h1>
      <ul>
        {articles.data.map((article: Article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>
              <h2>{article.Title}</h2>
            </Link>
            <p><strong>Author:</strong> {article.Author}</p>
            <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
