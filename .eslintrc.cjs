module.exports = {
  root: true,
  ignorePatterns: ["**/*"],
  plugins: [
    "@typescript-eslint",
    "react",
    "import",
    "react-refresh",
    "typescript-sort-keys",
    "sort-destructure-keys",
    "sort-keys",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
    },
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["tsconfig.*?.json"],
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
      ],
      rules: {
        "@typescript-eslint/ban-tslint-comment": ["error"],
        "@typescript-eslint/consistent-type-definitions": ["error"],
        "@typescript-eslint/naming-convention": [
          "warn",
          {
            selector: "variable",
            modifiers: ["const"],
            format: ["PascalCase", "camelCase", "UPPER_CASE"],
          }, // allows const to be UPPER_CASE
          { selector: "function", format: ["camelCase", "PascalCase"] },
          { selector: "typeLike", format: ["PascalCase"] },
          {
            selector: "variable",
            types: ["boolean"],
            format: ["PascalCase"],
            prefix: [
              "is",
              "are",
              "should",
              "has",
              "have",
              "can",
              "did",
              "will",
            ],
          },
        ],
        "@typescript-eslint/no-duplicate-enum-values": ["error"],
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": ["error"],
        "@typescript-eslint/no-unnecessary-condition": ["warn"],
        "@typescript-eslint/no-unnecessary-type-arguments": ["error"],
        "@typescript-eslint/no-useless-empty-export": ["error"],
        "@typescript-eslint/non-nullable-type-assertion-style": ["error"],
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-optional-chain": ["error"],
        "@typescript-eslint/prefer-readonly": ["error"],
        "@typescript-eslint/restrict-plus-operands": ["error"],
        "@typescript-eslint/restrict-template-expressions": [
          "error",
          {
            allowAny: true,
          },
        ],
        "import/no-default-export": "error",
        "no-unreachable": "warn",
        "react/forbid-component-props": [
          "warn",
          {
            forbid: [
              {
                propName: "style",
                allowedFor: ["ReactDataGrid"],
                message:
                  "style prop should only be used on DOM elements. Component styles are preferable controlled by custom props",
              },
            ],
          },
        ],
        "react/function-component-definition": [
          "warn",
          {
            namedComponents: ["function-declaration"],
          },
        ],
        "react/hook-use-state": "warn",
        "react/no-array-index-key": "error",
        "react/no-danger": "error",
        "react/no-multi-comp": ["warn", { ignoreStateless: true }],
        "react-refresh/only-export-components": "warn",
        "react/prop-types": "off",
        "react/jsx-sort-props": [
          "warn",
          {
            callbacksLast: true,
            shorthandFirst: true,
            reservedFirst: true,
          },
        ],
        "typescript-sort-keys/interface": "warn",
        "typescript-sort-keys/string-enum": "warn",
        "sort-destructure-keys/sort-destructure-keys": "warn",
        "sort-keys": "off", // disable default eslint sort-keys for plugin
        "sort-keys/sort-keys-fix": "warn",

        "react/jsx-no-constructed-context-values": "warn",
        "react/jsx-no-target-blank": "error",
        "react/jsx-no-useless-fragment": "warn",
        "object-shorthand": "warn",
        "no-console": ["error", { allow: ["warn", "error"] }],
      },
    },
    {
      files: ["*.js", "*.jsx"],
      rules: {},
    },
    {
      files: ["*.test.tsx"],
      rules: {
        "react/no-multi-comp": "off",
      },
    },
    {
      files: ["*.config.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
