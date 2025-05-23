const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const prettier = require('eslint-plugin-prettier');
const globals = require('globals');

module.exports = [
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parser: require('@babel/eslint-parser'),
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['babel-preset-expo'],
          plugins: [
            [
              'module-resolver',
              {
                root: ['./src'],
                alias: {
                  '@': './src',
                  '@components': './src/components',
                  '@screens': './src/screens',
                  '@constants': './src/constants',
                  '@theme': './src/theme',
                  '@utils': './src/utils',
                  '@hooks': './src/hooks',
                  '@store': './src/store',
                  '@service': './src/services',
                  '@assets': './assets',
                },
              },
            ],
          ],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        __DEV__: true,
        require: true,
        process: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': [
        'warn',
        {
          vars: 'local',
          varsIgnorePattern: '^_|React|^jsx$',
          args: 'none',
          ignoreRestSiblings: true,
        },
      ],
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
          printWidth: 80,
          bracketSpacing: true,
          arrowParens: 'avoid',
          endOfLine: 'auto',
          jsxSingleQuote: false,
          bracketSameLine: false,
          useTabs: false,
        },
      ],
    },
  },
];
