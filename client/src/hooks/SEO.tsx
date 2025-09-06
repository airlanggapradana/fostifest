import {Helmet} from "react-helmet-async";
import home from "@/assets/home.png"
import {VITE_BASE_URL} from "@/env.ts";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  schema?: object; // tambahin ini
};

export default function SEO({
                              title,
                              description,
                              keywords = "FOSTIFEST 2025, FOSTI UMS, FOSTIFEST, Workshop Vue.js, Competitive Programming",
                              image = home,
                              url = VITE_BASE_URL,
                              schema,
                            }: SEOProps) {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keywords" content={keywords}/>
      <meta name="author" content="FOSTI UMS"/>

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={image}/>
      <meta property="og:url" content={url}/>
      <meta property="og:type" content="website"/>

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={image}/>

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
