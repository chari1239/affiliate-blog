export const commentType = {
  name: "comment",
  title: "Comments",
  type: "document",
  // Anonymous reader comments, written only by the /api/comment endpoint
  // (one document per comment). Approval-based: a comment is created with
  // approved = false and is NEVER shown on the site until someone ticks
  // "Approved" here — the article pages only fetch approved comments.
  // The reader's own words (slug, name, text, time) are read-only; the
  // approval toggle is the one field meant to be edited by hand.
  orderings: [
    {
      title: "Newest first",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }]
    },
    {
      title: "Pending first",
      name: "pendingFirst",
      by: [
        { field: "approved", direction: "asc" },
        { field: "createdAt", direction: "desc" }
      ]
    }
  ],
  fields: [
    {
      name: "articleSlug",
      title: "Article slug",
      type: "string",
      readOnly: true
    },
    {
      name: "name",
      title: "Name (optional — blank means Anonymous)",
      type: "string",
      readOnly: true
    },
    {
      name: "text",
      title: "Comment",
      type: "text",
      readOnly: true
    },
    {
      name: "approved",
      title: "Approved (shown on the site)",
      type: "boolean",
      initialValue: false
    },
    {
      name: "createdAt",
      title: "Received (UTC)",
      type: "datetime",
      readOnly: true
    }
  ],
  preview: {
    select: {
      name: "name",
      text: "text",
      approved: "approved",
      slug: "articleSlug"
    },
    prepare(selection) {
      const { name, text, approved, slug } = selection;
      const snippet = (text || "").trim().replace(/\s+/g, " ");
      return {
        title: snippet ? snippet.slice(0, 60) : "(empty comment)",
        subtitle: `${approved ? "✓ Approved" : "⏳ Pending"} · ${name || "Anonymous"} · ${slug || ""}`
      };
    }
  }
};
