import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [preact({ compat: true }), tailwind({ applyBaseStyles: false })],
  output: "server",
  adapter: vercel(),
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});
