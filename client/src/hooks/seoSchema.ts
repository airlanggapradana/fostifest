export const WebSiteSchema = (name: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name,
  url,
});

export const ArticleSchema = ({
                                headline,
                                description,
                                author,
                                datePublished,
                                dateModified,
                                url,
                              }: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  description,
  author: {
    "@type": "Person",
    name: author,
  },
  datePublished,
  dateModified: dateModified ?? datePublished,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
});

export const ProductSchema = ({
                                name,
                                description,
                                sku,
                                brand,
                                price,
                                currency,
                                availability,
                                url,
                              }: {
  name: string;
  description: string;
  sku: string;
  brand: string;
  price: number;
  currency: string;
  availability: string; // e.g. "InStock" / "OutOfStock"
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name,
  description,
  sku,
  brand: {
    "@type": "Brand",
    name: brand,
  },
  offers: {
    "@type": "Offer",
    price,
    priceCurrency: currency,
    availability: `https://schema.org/${availability}`,
    url,
  },
});

export const EventSchema = ({
                              name,
                              startDate,
                              endDate,
                              location,
                              url,
                            }: {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name,
  startDate,
  endDate,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: location,
    address: location,
  },
  url,
});
