module.exports = {
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/config/webpack/test.js",
    "<rootDir>/vendor",
    "__generated__"
  ],
  coverageDirectory: "./coverage/",
  collectCoverage: true
};
