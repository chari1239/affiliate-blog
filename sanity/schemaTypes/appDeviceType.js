export const appDeviceType = {
  name: "appDevice",
  title: "App Devices",
  type: "document",
  // One document per device that has opened the site as an installed
  // web app (home-screen icon / standalone mode), written only by the
  // /api/app-device endpoint and keyed by a random id the device
  // keeps in its own localStorage. The number of documents in this
  // list IS the installed-app device count. Every field is
  // read-only: view the count here, never edit by hand.
  fields: [
    {
      name: "deviceId",
      title: "Device id (random, per device)",
      type: "string",
      readOnly: true
    },
    {
      name: "platform",
      title: "Platform (ios / android / other)",
      type: "string",
      readOnly: true
    },
    {
      name: "firstSeen",
      title: "First opened as an app (UTC)",
      type: "string",
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: "platform",
      subtitle: "firstSeen"
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title ? `${title} device` : "App device",
        subtitle: subtitle ? `First seen ${subtitle}` : undefined
      };
    }
  }
};
