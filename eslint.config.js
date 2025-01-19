import eslint from "@eslint/js";
import safeql from "@ts-safeql/eslint-plugin/config";
import "dotenv/config";
import perfectionist from "eslint-plugin-perfectionist";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  eslint.configs.recommended,

  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  perfectionist.configs["recommended-natural"],

  safeql.configs.connections({
    // read more about configuration in the next section
    connectionUrl: process.env.DATABASE_URL,
    migrationsDir: "./prisma/migrations",
    targets: [
      { tag: "prisma.+($queryRaw|$executeRaw)", transform: "{type}[]" },
    ],
  }),

  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: "./tsconfig.json",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },

  {
    rules: {
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
        },
      ],
      "no-console": "off",
      "one-var": "off",
    },
  },
);
