module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended", "prettier"],
  ignorePatterns: ["coverage/**/*", "build/**/*"],
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
    "import/no-default-export": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
