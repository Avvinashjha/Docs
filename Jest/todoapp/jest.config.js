module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest', // Use Babel to transform JavaScript files
    },
    testEnvironment: 'jsdom', // Use jsdom for DOM-related tests (optional)
  };