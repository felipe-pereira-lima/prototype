module.exports = {
  root: true,
  ignorePatterns: ["**/*"],
  plugins: [
    "@nx",
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
      rules: {
        "@nx/enforce-module-boundaries": [
          "warn",
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: "*",
                onlyDependOnLibsWithTags: ["*"],
              },
            ],
          },
        ],
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["tsconfig.*?.json"],
      },
      extends: [
        "plugin:@nx/typescript",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        // "plugin:@typescript-eslint/recommended-requiring-type-checking",
        // "plugin:@typescript-eslint/strict",
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
          },
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
      },
    },
    {
      files: ["*.js", "*.jsx"],
      extends: ["plugin:@nx/javascript"],
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
