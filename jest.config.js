const nextJest = require("next/jest");
//const createJestConfig = nextJest({
//    dir: "./",
//});
//const customJestConfig = {
//    moduleDirectories: ["node_modules", "<rootDir>/"],
//    testEnvironment: "jest-environment-jsdom",
//};
//module.exports = createJestConfig(customJestConfig);

module.exports = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    globals: {
        'ts-jest': {
            tsconfig: {
                jsx: 'react-jsx',
            },
        },
    },
}