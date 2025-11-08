// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const { jsx } = require('react/jsx-runtime');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  }
]);
