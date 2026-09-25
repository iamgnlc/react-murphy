import js from "@eslint/js";
import reactX from "@eslint-react/eslint-plugin";
import { globalIgnores } from "eslint/config";
import love from "eslint-config-love";
import prettier from "eslint-config-prettier";
import importX from "eslint-plugin-import-x";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

const config = [
  globalIgnores(["coverage/**/*", "build/**/*", "dist/**/*"]),

  // eslint-config-love: maintained successor of `standard-with-typescript`.
  // Ships typescript-eslint (type-aware via projectService) plus the n,
  // promise and eslint-comments plugins.
  {
    ...love,
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ...love.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
    },
    rules: {
      ...love.rules,

      // Base rule superseded by its @typescript-eslint equivalent.
      "no-unused-vars": "off",

      // Relaxations carried over from the previous config.
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-require-imports": "off",

      // Too noisy for UI code and tests.
      "@typescript-eslint/no-magic-numbers": "off",

      // Accept the `u` flag; `v` would require an ES2024 TS target.
      "require-unicode-regexp": ["error", { "requireFlag": "u" }],
    },
  },

  js.configs.recommended,
  reactX.configs["recommended-typescript"],

  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // TypeScript's compiler already catches undefined references, and the
      // base rule doesn't know TS type names like ImportMetaEnv.
      "no-undef": "off",
    },
  },

  reactHooks.configs.flat.recommended,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "import-x": importX,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "import-x/no-default-export": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  // Turn off stylistic rules that conflict with Prettier (must be last).
  prettier,

  {
    files: ["**/*.config.ts", "eslint.config.ts"],
    rules: {
      "import-x/no-default-export": "off",
    },
  },

  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    rules: {
      // Timer-advancing loops await on every cycle by design.
      "no-await-in-loop": "off",
    },
  },
];

export default config;
