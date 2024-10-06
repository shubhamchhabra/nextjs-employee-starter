// app/page.tsx

import { Page } from "./types";


export default async function HomePage() {
  // Fetch homepage data based on the slug "home"
  const homepage: Page | null = await fetchHomePage();
  console.log(homepage, 'home')
  if (!homepage) {
    return <h1>Homepage not found</h1>; // Handle case where the homepage is not found
  }

  // const blocks = homepage?.attributes?.contentBlocks;

  return (
    <div>
      <h1>{homepage.page_title}</h1>
      {/* {blocks.map((block, index) => {
        switch (block.__component) {
          case 'text-block':
            return <p key={index}>{block.text}</p>;
          case 'image-block':
            return (
              <img
                key={index}
                src={block.image.url}
                alt={block.image.altText || 'Image'}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            );
          case 'button-block':
            return (
              <a key={index} href={block.link} className="button">
                {block.label}
              </a>
            );
          case 'video-block':
            return (
              <iframe
                key={index}
                src={block.videoUrl}
                width="560"
                height="315"
                frameBorder="0"
                allowFullScreen
              />
            );
          default:
            return null;
        }
      })} */}
    </div>
  );
}

// Utility to fetch the homepage content
async function fetchHomePage(): Promise<Page | null> {
  try { 
    const res = await fetch(`http://localhost:1337/api/pages?filters[slug]=home&populate=*`);
    const data = await res.json();
    return data.data[0];
  } catch (error) {
    console.error(error, 'error');
    return null;
  }
}
