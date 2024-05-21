import pluginJs from "@eslint/js";
import globals from "globals";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];

module.exports = {
  root: true,
  extends: ["plugin:tailwindcss/recommended"],
};
overrides: [
  {
    files: ["*.html", "*.blade.php"],
    parser: "@angular-eslint/template-parser",
  },
];
