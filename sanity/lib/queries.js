export const articlesListQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    affiliateDisclosure,
    featuredProductSlug,
    coverImage,
    author->{
      name,
      "slug": slug.current
    },
    categories[]->{
      title,
      "slug": slug.current
    }
  }
`;

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    affiliateDisclosure,
    featuredProductSlug,
    coverImage,
    body,
    seoTitle,
    seoDescription,
    author->{
      name,
      "slug": slug.current,
      bio
    },
    categories[]->{
      title,
      "slug": slug.current
    }
  }
`;
