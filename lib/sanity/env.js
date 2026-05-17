export const sanityApiVersion = "2026-05-16";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ebw9h979";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityStudioBasePath = "/studio";

export const isSanityConfigured = Boolean(sanityProjectId && sanityDataset);

export function getMissingSanityEnvVars() {
  const missing = [];

  if (!sanityProjectId) {
    missing.push("NEXT_PUBLIC_SANITY_PROJECT_ID");
  }

  if (!sanityDataset) {
    missing.push("NEXT_PUBLIC_SANITY_DATASET");
  }

  return missing;
}

export function assertSanityConfigured(context = "Sanity") {
  const missing = getMissingSanityEnvVars();

  if (!missing.length) {
    return;
  }

  throw new Error(
    `${context} is not configured. Missing environment variables: ${missing.join(", ")}. ` +
      `Copy .env.example to .env.local and set those values before starting Sanity.`
  );

}
