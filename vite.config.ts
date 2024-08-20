import { defineConfig } from "vite";
import dotenv from "dotenv";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envFiles = {
    development: ".env.development",
    staging: ".env.staging",
    uat: ".env.uat",
    production: ".env.production",
  };

  const envFile = envFiles[mode] || ".env.development";
  const envConfig = dotenv.config({ path: envFile }).parsed;
  return {
    plugins: [reactRefresh(), tsconfigPaths()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.split("node_modules/")[1].split("/")[0];
            }
          },
        },
      },
    },
    server: {
      port: 3335,
    },
    ...envConfig,
  };
});
