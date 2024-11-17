module.exports = {
  extends: [
    'expo', // Extends the default Expo rules
    'prettier', // Integrates Prettier rules to format your code
  ],
  plugins: ['prettier'], // Enables the Prettier plugin
  rules: {
    // Enforces Prettier's code formatting rules
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // Handles different environments with varying end-of-line styles
        singleQuote: false, // Enforces single quotes for consistency
        trailingComma: 'es5', // Adds trailing commas where valid in ES5 (objects, arrays, etc.)
        semi: true, // Disables semicolons to match modern JS styles
      },
    ],
    // Example rule overrides for flexibility (adjust as needed):
    'no-console': 'warn', // Warns instead of throwing an error for console statements
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ignores unused variables starting with an underscore
  },
  env: {
    browser: true, // Specifies the environment as browser (for React Native web support)
    node: true, // Adds support for Node.js environment variables
  },
}
