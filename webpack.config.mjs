import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { resolve } from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default (env, argv) => {
  const isProduction = argv.mode === "production";
  const shouldAnalyze = env.analyze === "true";

  return {
    entry: "./src/index.ts",
    output: {
      path: resolve(process.cwd(), "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|mts|cts)$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Zod Demo",
      }),
      ...(shouldAnalyze
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: "server",
              openAnalyzer: true,
            }),
          ]
        : isProduction
        ? [
            // Only generate the stats file in production but don't open the analyzer
            new BundleAnalyzerPlugin({
              analyzerMode: "disabled",
              generateStatsFile: true,
              statsFilename: "bundle-stats.json",
            }),
          ]
        : []),
    ],
  };
};
