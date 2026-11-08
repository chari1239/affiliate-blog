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

export const articlePrevInCategoryQuery = `
  *[_type == "article" && slug.current != $slug && publishedAt < $publishedAt && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) [0] {
    title,
    "slug": slug.current
  }
`;

export const articleNextInCategoryQuery = `
  *[_type == "article" && slug.current != $slug && publishedAt > $publishedAt && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt asc) [0] {
    title,
    "slug": slug.current
  }
`;

export const articlePrevGlobalQuery = `
  *[_type == "article" && slug.current != $slug && publishedAt < $publishedAt] | order(publishedAt desc) [0] {
    title,
    "slug": slug.current
  }
`;

export const articleNextGlobalQuery = `
  *[_type == "article" && slug.current != $slug && publishedAt > $publishedAt] | order(publishedAt asc) [0] {
    title,
    "slug": slug.current
  }
`;

// Approved reader comments for one article, newest first. The
// approved == true filter is the moderation gate: unapproved comments
// are never returned to a public page.
export const approvedCommentsQuery = `
  *[_type == "comment" && articleSlug == $slug && approved == true] | order(createdAt desc) [0...100] {
    _id,
    name,
    text,
    createdAt
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
