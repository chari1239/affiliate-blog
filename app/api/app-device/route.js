import { sendEventEmail } from "@/lib/notify";

// Installed-app device counter. When the site is opened from a
// home-screen icon (standalone display mode) or an `appinstalled`
// event fires, components/app-device-reporter.jsx generates one UUID
// per device, keeps it in that device's localStorage, and posts it
// here exactly once. We store one Sanity document per device,
// _id "appDevice.<deviceId>", so the number of documents of this
// type IS the installed-app device count, readable in the Studio
// under "App Devices". No personal data — just the random id, the
// platform family and the first-seen time.
//
// Like /api/quiz-event, counting must never break the page: without
// SANITY_API_WRITE_TOKEN (or on any error) this quietly no-ops.
//
// A genuinely new device also emails the owner (via lib/notify).
// Because the store below is createIfNotExists, the route first
// checks whether the device document already exists and only
// notifies when it does not — repeat reports from a known device
// must not re-email.

const PROJECT_ID = "ebw9h979";
const DATASET = "production";
const API_VERSION = "2024-10-01";

const PLATFORMS = ["ios", "android", "other"];

export async function POST(request) {
  const done = () => new Response(null, { status: 204 });

  let body;
  try {
    body = await request.json();
  } catch {
    return done();
  }

  const deviceId = body && body.deviceId;
  if (typeof deviceId !== "string" || !deviceId || deviceId.length > 100) {
    return done();
  }
  const platform = PLATFORMS.includes(body.platform) ? body.platform : "other";

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return done();

  const id = `appDevice.${deviceId}`;
  const firstSeen = new Date().toISOString();

  // New-device check, in the same query style /api/quiz-event uses.
  // If the check itself fails we stay silent (no email): registration
  // continues exactly as before either way.
  let isNew = false;
  try {
    const query = encodeURIComponent(`*[_id == "${id}"][0]._id`);
    const res = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const json = await res.json();
    isNew = !json || !json.result;
  } catch {
    // Counting must never surface an error to the reader.
  }

  try {
    await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          mutations: [
            {
              // createIfNotExists (not createOrReplace) so a device
              // that somehow reports twice keeps its true firstSeen.
              createIfNotExists: {
                _id: id,
                _type: "appDevice",
                deviceId,
                platform,
                firstSeen
              }
            }
          ]
        })
      }
    );
  } catch {
    // Counting must never surface an error to the reader.
  }

  if (isNew) {
    await sendEventEmail({ event: "app_install", platform, firstSeen });
  }

  return done();
}
