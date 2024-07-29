import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site:
    process.env.NODE_ENV === "production"
      ? "https://template-ecommerce-rosy.vercel.app/"
      : "http://localhost:4321",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: "server",
  adapter: vercel(),
  experimental: {
    serverIslands: true,
    env: {
      schema: {
        FIREBASE_PRIVATE_KEY_ID: envField.string({
          context: "server",
          access: "secret",
        }),
        FIREBASE_PRIVATE_KEY: envField.string({
          context: "server",
          access: "secret",
        }),
        FIREBASE_CLIENT_EMAIL: envField.string({
          context: "server",
          access: "public",
        }),
        FIREBASE_CLIENT_ID: envField.string({
          context: "server",
          access: "public",
        }),
        FIREBASE_PROJECT_ID: envField.string({
          context: "server",
          access: "public",
        }),
        FIREBASE_AUTH_URI: envField.string({
          context: "server",
          access: "public",
        }),
        FIREBASE_TOKEN_URI: envField.string({
          context: "server",
          access: "public",
        }),
        FIREBASE_AUTH_CERT_URL: envField.string({
          context: "server",
          access: "public",
        }),
        FIREBASE_CLIENT_CERT_URL: envField.string({
          context: "server",
          access: "public",
        }),
        API_KEY: envField.string({
          context: "client",
          access: "public",
        }),
        AUTH_DOMAIN: envField.string({
          context: "client",
          access: "public",
        }),
        PROJECT_ID: envField.string({
          context: "client",
          access: "public",
        }),
        STORAGE_BUCKET: envField.string({
          context: "client",
          access: "public",
        }),
        MESSAGING_SENDER_ID: envField.string({
          context: "client",
          access: "public",
        }),
        APP_ID: envField.string({
          context: "client",
          access: "public",
        }),
        MEASUREMENT_ID: envField.string({
          context: "client",
          access: "public",
          optional: true,
        }),
        SECRET_KEY: envField.string({
          context: "client",
          access: "public",
        }),
      },
    },
  },
});
