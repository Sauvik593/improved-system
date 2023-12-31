module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  settings: {
    jest: {
      version: 28,
    },
  },
  extends: [
	  "eslint:recommended",
	  "plugin:react/recommended",
	  "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
	  "prettier" 
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react", "react-hooks", "@typescript-eslint", "prettier"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": ["error"]  }
};