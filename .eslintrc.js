module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        "handle-callback-err": "off",
        "comma-dangle": "off",
    }
};
