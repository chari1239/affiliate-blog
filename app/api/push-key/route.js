// Returns the public VAPID key the browser needs to create a push
// subscription (components/notify-button.jsx fetches it before calling
// pushManager.subscribe). The public key is not a secret — it is safe
// to expose. When NEXT_PUBLIC_VAPID_PUBLIC_KEY is not set in the
// environment this returns an empty string and the notify button
// shows its "unavailable" state instead of offering a subscribe that
// could never work.

export async function GET() {
  return Response.json({
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ""
  });
}
