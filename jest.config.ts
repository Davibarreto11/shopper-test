import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["<rootDir>/src/modules/**/services/*.ts"],
  coverageReporters: ["json", "text", "lcov", "clover"],
  preset: "ts-jest",
  testMatch: ["**/*.spec.ts"],
};

export default config;
