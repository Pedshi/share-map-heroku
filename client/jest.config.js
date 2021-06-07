module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/styles/styleMock.js',
  },
  setupFilesAfterEnv: [ "@testing-library/jest-dom/extend-expect"]
};