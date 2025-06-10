// eslint.config.mjs
import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import { fixupConfigRules } from "@eslint/compat"

export default [
  // Apply settings to all JavaScript, TypeScript, and JSX/TSX files
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      parserOptions: {
        // Set parser options for parsing JSX
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: globals.browser, // Add browser global variables
    },
  },

  pluginJs.configs.recommended, // Apply basic ESLint rules
  ...tseslint.configs.recommended, // Apply TypeScript rules
  ...fixupConfigRules(pluginReactConfig), // Apply React rules

  {
    settings: {
      // Automatically detect React version
      react: { version: "detect" },
    },
  },
  {
    // Additional custom rules
    rules: {
      "no-console": "warn", // Warn when using console.log
      "no-unused-vars": "warn", // Warn for unused variables
      "react/prop-types": "off", // Disable React prop-types
      "@typescript-eslint/no-unused-vars": ["warn"],
      // Warn for unused TypeScript variables
    },
  },
]