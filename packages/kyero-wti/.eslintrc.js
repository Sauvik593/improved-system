/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['kyero'],
  ignorePatterns: ['node_modules', 'dist', 'coverage', 'build'],
};
