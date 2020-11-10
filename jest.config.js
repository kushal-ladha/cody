module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/config/webpack/test.js",
    "<rootDir>/vendor"
  ],
  coverageDirectory: "./coverage/",
  collectCoverage: true
};
