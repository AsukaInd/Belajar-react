module.exports = {
   env: {
      browser: true,
      es6: true,
   },
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
   },
   plugins: ["react"],
   rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "prefer-promise-reject-errors": "off",
      "react/display-name": "off",
      camelcase: "off",
   },
   extends: ["plugin:react/recommended", "standard", "prettier"],
   settings: {
      react: {
         version: "detect",
      },
   },
};
