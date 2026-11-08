export const quizStatsType = {
  name: "quizStats",
  title: "Quiz Stats",
  type: "document",
  // Counter documents written only by the /api/quiz-event endpoint
  // (one per quiz article, keyed by slug). Every field is read-only so
  // the numbers can be viewed in the Studio but never edited by hand.
  // Average score of finished runs = scoreSum / finishes.
  // checksByQuestion counts answer checks per question (Q1 first), so
  // a drop-off shows up as the counts shrinking along the list.
  fields: [
    {
      name: "slug",
      title: "Article slug (quiz)",
      type: "string",
      readOnly: true
    },
    {
      name: "starts",
      title: "Quiz starts",
      type: "number",
      readOnly: true
    },
    {
      name: "checks",
      title: "Answer checks",
      type: "number",
      readOnly: true
    },
    {
      name: "correctChecks",
      title: "Correct checks",
      type: "number",
      readOnly: true
    },
    {
      name: "finishes",
      title: "Finishes (all words resolved)",
      type: "number",
      readOnly: true
    },
    {
      name: "scoreSum",
      title: "Total score of finishes",
      type: "number",
      readOnly: true
    },
    {
      name: "fullScores",
      title: "Perfect-score finishes",
      type: "number",
      readOnly: true
    },
    {
      name: "hints",
      title: "Hint uses",
      type: "number",
      readOnly: true
    },
    {
      name: "checksByQuestion",
      title: "Checks per question (Q1 first)",
      type: "array",
      of: [{ type: "number" }],
      readOnly: true
    },
    {
      name: "updatedAt",
      title: "Last counted event (UTC)",
      type: "string",
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: "slug",
      starts: "starts"
    },
    prepare(selection) {
      const { title, starts } = selection;
      return {
        title: title || "Quiz",
        subtitle: `${starts ?? 0} starts`
      };
    }
  }
};
