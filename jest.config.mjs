// jest.config.mjs
import { pathsToModuleNameMapper } from "tsconfig-paths-jest";
import tsconfig from "./tsconfig.json" assert { type: "json" };

export default {
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};
