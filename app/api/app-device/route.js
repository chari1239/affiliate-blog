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
                _id: `appDevice.${deviceId}`,
                _type: "appDevice",
                deviceId,
                platform,
                firstSeen: new Date().toISOString()
              }
            }
          ]
        })
      }
    );
  } catch {
    // Counting must never surface an error to the reader.
  }
  return done();
}
