import "dotenv/config";

import eslint from "@eslint/js";
import safeql from "@ts-safeql/eslint-plugin/config";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  eslint.configs.recommended,

  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  safeql.configs.connections({
    // read more about configuration in the next section
    connectionUrl: process.env.DATABASE_URL,
    migrationsDir: "./prisma/migrations",
    targets: [
      { tag: "prisma.+($queryRaw|$executeRaw)", transform: "{type}[]" },
    ],
  }),

  {
    rules: {
      "no-console": "off",
      "one-var": "off",
    },
  },

  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
);
