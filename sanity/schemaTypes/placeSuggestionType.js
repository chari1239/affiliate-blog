export const placeSuggestionType = {
  name: "placeSuggestion",
  title: "Suggestions",
  type: "document",
  // "Suggest an update" messages from the place directory, written only
  // by the /api/suggestion endpoint. Suggestions are private: they are
  // never fetched by any public page — they land here as a to-do list
  // for keeping the guide accurate. Tick "Handled" once the guide has
  // been updated (or the suggestion checked and closed).
  orderings: [
    {
      title: "Newest first",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }]
    },
    {
      title: "Unhandled first",
      name: "unhandledFirst",
      by: [
        { field: "handled", direction: "asc" },
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
      name: "placeName",
      title: "Place",
      type: "string",
      readOnly: true
    },
    {
      name: "name",
      title: "Name (optional)",
      type: "string",
      readOnly: true
    },
    {
      name: "message",
      title: "Suggestion",
      type: "text",
      readOnly: true
    },
    {
      name: "handled",
      title: "Handled (guide updated / checked)",
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
      placeName: "placeName",
      message: "message",
      handled: "handled",
      name: "name"
    },
    prepare(selection) {
      const { placeName, message, handled, name } = selection;
      const snippet = (message || "").trim().replace(/\s+/g, " ");
      return {
        title: placeName || "(no place given)",
        subtitle: `${handled ? "✓ Handled" : "⏳ To check"} · ${name || "Anonymous"} · ${snippet.slice(0, 50)}`
      };
    }
  }
};
