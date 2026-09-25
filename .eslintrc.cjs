module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended", "prettier"],
  ignorePatterns: ["coverage/**/*", "dist/**/*"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "simple-import-sort"],
  rules: {
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-unused-vars": "error",
    "react/react-in-jsx-scope": "off",
    "import/no-default-export": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  settings: {
    react: {
      version: "detect",
      jsxRuntime: "automatic",
    },
  },
  overrides: [
    {
      files: ["*.config.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
