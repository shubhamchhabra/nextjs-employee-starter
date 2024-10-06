// app/pages/[slug]/page.tsx

import { useRouter } from 'next/router';
import { ButtonBlock, ImageBlock, Page, PageBlock, TextBlock, VideoBlock } from '../../types'; // Adjust the path based on your project structure

export default async function PageComponent() {
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the URL

  // Fetch page content based on the slug
  const res = await fetch(`http://localhost:1337/api/pages?filters[slug][$eq]=${slug}&populate=*`);

  if (!res.ok) {
    throw new Error('Failed to fetch page content');
  }

  const pageContent = await res.json();

  if (pageContent.data.length === 0) {
    return <h1>Page Not Found</h1>; // Handle case where page is not found
  }

  const blocks: PageBlock[] = pageContent.data[0].attributes.contentBlocks;

  return (
    <div>
      <h1>{pageContent.data[0].attributes.Title}</h1>
      {blocks.map((block, index) => {
        switch (block.__component) {
          case 'text-block':
            return <p key={index}>{(block as TextBlock).text}</p>;
          case 'image-block':
            const imageBlock = block as ImageBlock;
            return (
              <img
                key={index}
                src={imageBlock.image.url}
                alt={imageBlock.image.altText || 'Image'}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            );
          case 'button-block':
            const buttonBlock = block as ButtonBlock;
            return (
              <a key={index} href={buttonBlock.link} className="button">
                {buttonBlock.label}
              </a>
            );
          case 'video-block':
            const videoBlock = block as VideoBlock;
            return (
              <iframe
                key={index}
                src={videoBlock.videoUrl}
                width="560"
                height="315"
                frameBorder="0"
                allowFullScreen
              />
            );
          default:
            return null; // Handle unknown component types
        }
      })}
    </div>
  );
}
