module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'on' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'on' : 'off',
    'prettier/prettier': [
      'warn',
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'avoid',
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
