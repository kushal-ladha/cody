module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/config/webpack/test.js",
    "<rootDir>/vendor"
  ],
  setupFilesAfterEnv: ["<rootDir>/config/setupJest.js"],
  coverageDirectory: "./coverage/",
  collectCoverage: true
};
