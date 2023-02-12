import { NextSeo } from 'next-seo';

// The props for the SEO component
type Props = {
  url?: string | undefined; // The URL of the page
  siteName?: string | undefined; // The name of the site
  title?: string | undefined; // The title of the page
  description?: string | undefined; // The description of the page
  canonical?: string | undefined; // The canonical URL of the page
};

// The SEO component
export default function Seo({
  url,
  siteName,
  title,
  description,
  canonical
}: Props) {
  // Return the SEO component with the title and meta tags for SEO purposes and the favicon for the browser
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      openGraph={{
        url,
        title,
        description,
        siteName
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image'
      }}
    />
  );
}
