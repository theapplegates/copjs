import { NextSeo } from 'next-seo';

type Props = {
  url?: string | undefined; // The URL of the page
  siteName?: string | undefined; // The name of the site
  title?: string | undefined; // The title of the page
  description?: string | undefined; // The description of the page
  canonical?: string | undefined; // The canonical URL of the page
};

export default function Seo({
  url,
  siteName,
  title,
  description,
  canonical
}: Props) {
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
