module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
