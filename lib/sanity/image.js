import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityDataset, sanityProjectId } from "@/lib/sanity/env";

const builder =
  sanityProjectId && sanityDataset
    ? createImageUrlBuilder({
        projectId: sanityProjectId,
        dataset: sanityDataset
      })
    : null;

export function urlForImage(source) {
  if (!builder || !source) {
    return null;
  }

  return builder.image(source);
}
