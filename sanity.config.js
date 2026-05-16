import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schemaTypes";
import { assertSanityConfigured, sanityDataset, sanityProjectId, sanityStudioBasePath } from "./lib/sanity/env";

assertSanityConfigured("Sanity Studio");

export default defineConfig({
  name: "default",
  title: "Nihon Diaries Studio",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: sanityStudioBasePath,
  plugins: [deskTool()],
  schema: {
    types: schemaTypes
  }
});
