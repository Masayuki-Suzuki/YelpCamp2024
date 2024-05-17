import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
    eslint.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: globals.browser,
            node: true,
        },
        ignores: ['node_modules/**/*', 'dist/**/*', 'build/**/*', '.turbo/**/*', '.yarn/**/*', 'prisma/**/*'],
        rules: {
            'arrow-parens': [2, 'as-needed'],
            'brace-style': [0, 'never'],
            'comma-dangle': [2, 'never'],
            curly: [2, 'all'],
            indent: [1, 4, { SwitchCase: 1 }],
            'lines-between-class-members': 0,
            'max-len': [1,
                {
                    code: 120,
                    ignoreComments: true,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreRegExpLiterals: true,
                }
            ],
            'new-parens': 2,
            'no-irregular-whitespace': 1,
            'no-multiple-empty-lines': [1, { max: 1 }],
            'no-new': 0,
            'no-trailing-spaces': 1,
            'no-unused-expressions': 0,
            'no-undef-init': 'error',
            'no-var': 2,
            'object-shorthand': 2,
            'object-curly-newline': [
                1,
                {
                    ObjectExpression: { multiline: true, minProperties: 4, consistent: true },
                    ImportDeclaration: 'never',
                    ExportDeclaration: 'never'
                }
            ],
            'object-curly-spacing': [1, 'always'],
            'one-var-declaration-per-line': 2,
            'padded-blocks': 0,
            'prefer-arrow-callback': 2,
            'prefer-const': 2,
            quotes: [2, 'single', { allowTemplateLiterals: true, avoidEscape: true }],
            'require-await': 1,
            semi: [2, 'never'],
            'space-before-function-paren': [0, 'never']
        }
    },
)
