import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

export default defineConfig({
  name: "indira-portfolio",
  title: "Indira Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [deskTool({ structure })],
  schema: { types: schemaTypes },
});
