import { defineCliConfig } from "sanity/cli";
import { assertSanityConfigured, sanityDataset, sanityProjectId } from "./lib/sanity/env";

assertSanityConfigured("Sanity CLI");

export default defineCliConfig({
  api: {
    projectId: sanityProjectId,
    dataset: sanityDataset
  }
});
