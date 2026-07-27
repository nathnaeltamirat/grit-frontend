import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginQuery from "@tanstack/eslint-plugin-query"
import reactPlugin from "eslint-plugin-react"

import js from "@eslint/js"
export default[
    js.configs.recommended,
    ...pluginQuery.configs["flat/recommended"],
    ...tseslint.configs.recommended,
    {
        ignores:["dist"]
    },
    {
        plugins:{
            react:reactPlugin
        },
        rules:{
            ...reactPlugin.configs.recommended
        },
        settings:{
            react:{
                version: "detect"
            }
        }
    },
    {
        files:["**/*.{ts,tsx}"],
        languageOptions:{
            globals:{
                ...globals.browser,
                ...globals.node
            },
            parserOptions:{
                ecmaFeatures:{
                    tsx:'true'
                }
            }
        },
        rules:{
            'react/no-unescaped-entities':0,
            'react/prop-types':'0'
        }

    },
    reactPlugin.configs.flat['jsx-runtime'],
    prettier
]