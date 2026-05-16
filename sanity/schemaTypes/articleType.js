export const articleType = {
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(12).max(90)
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(80).max(220)
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.max(140)
        }
      ]
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required()
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }]
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }]
    },
    {
      name: "affiliateDisclosure",
      title: "Affiliate disclosure",
      type: "text",
      rows: 2,
      initialValue:
        "This article may include affiliate links. We may earn a commission if you buy through those links."
    },
    {
      name: "featuredProductSlug",
      title: "Featured product slug",
      type: "string",
      description: "Match this to a slug in lib/products.js until product content also moves into Sanity."
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }]
    },
    {
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      validation: (rule) => rule.max(65)
    },
    {
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160)
    }
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "coverImage"
    }
  }
};
