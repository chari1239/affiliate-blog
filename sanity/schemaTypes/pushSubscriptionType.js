export const pushSubscriptionType = {
  name: "pushSubscription",
  title: "Push Subscriptions",
  type: "document",
  // One document per subscribed browser/device, written only by the
  // /api/push-subscribe endpoint (the document id is a hash of the
  // push endpoint, so re-subscribing replaces the same document).
  // The number of documents in this list IS the subscriber count.
  // Every field is read-only: the list is for viewing the count, and
  // expired subscriptions are pruned automatically by /api/push-send.
  fields: [
    {
      name: "endpoint",
      title: "Push endpoint",
      type: "string",
      readOnly: true
    },
    {
      name: "keys",
      title: "Subscription keys",
      type: "object",
      readOnly: true,
      fields: [
        {
          name: "p256dh",
          title: "p256dh key",
          type: "string",
          readOnly: true
        },
        {
          name: "auth",
          title: "auth secret",
          type: "string",
          readOnly: true
        }
      ]
    },
    {
      name: "userAgent",
      title: "Browser / device",
      type: "string",
      readOnly: true
    },
    {
      name: "createdAt",
      title: "Subscribed at (UTC)",
      type: "string",
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: "userAgent",
      subtitle: "createdAt"
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Subscription",
        subtitle: subtitle ? `Subscribed ${subtitle}` : undefined
      };
    }
  }
};
