module.exports = {
  env: {
    node: true,
    mocha: true
  },
  extends: ["eslint:recommended"],
  plugins: ["json"],
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }]
  }
};
