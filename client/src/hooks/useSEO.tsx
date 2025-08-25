import {Helmet} from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string; // default: website
  schema?: Record<string, any>;
}

const SITE_NAME = "FOSTIFEST 2025"; // bisa diambil dari env kalau mau
const TITLE_SEPARATOR = " | ";

export const useSEO = ({
                         title,
                         description,
                         url = "https://mysite.com",
                         image = "https://mysite.com/preview.png",
                         type = "website",
                         schema,
                       }: SEOProps) => {
  // Auto append site name
  const fullTitle = `${title}${TITLE_SEPARATOR}${SITE_NAME}`;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description}/>

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle}/>
      <meta property="og:description" content={description}/>
      <meta property="og:type" content={type}/>
      <meta property="og:url" content={url}/>
      <meta property="og:image" content={image}/>

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={fullTitle}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={image}/>

      {/* Schema.org */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
