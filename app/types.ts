// types.ts

export interface TextBlock {
    __component: 'text-block'; // Matches the component name in Strapi
    text: string; // The text content
  }
  
  export interface ImageBlock {
    __component: 'image-block'; // Matches the component name in Strapi
    image: {
      url: string; // URL of the image
      altText?: string; // Optional alt text
    };
  }
  
  export interface ButtonBlock {
    __component: 'button-block'; // Matches the component name in Strapi
    label: string; // Text for the button
    link: string; // URL for the button link
  }
  
  export interface VideoBlock {
    __component: 'video-block'; // Matches the component name in Strapi
    videoUrl: string; // URL of the video
  }
  
  export type PageBlock = TextBlock | ImageBlock | ButtonBlock | VideoBlock;
  
  export interface Page {
    id: number;
    page_title: string;
    page_dynamic_content: PageBlock[]; // Array of blocks
  }
  