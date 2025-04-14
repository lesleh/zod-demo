export default {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|mts|cts)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
};
