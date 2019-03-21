const path          = require("path");
const webpack       = require("webpack");
const nodeExternals = require("webpack-node-externals");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry  : {
        server: ["./server/server.js"],
    },
    output : {
        filename: "[name].js",
        path    : path.resolve(__dirname, "dist"),
    },
    mode   : "development",
    target : "node",
    resolve: {
        modules: [
            "node_modules",
            path.resolve("./server/"),
            path.resolve("./static/"),
            path.resolve("./app/"),
        ],
    },

    plugins  : [
        new webpack.ProvidePlugin({
            React : "react",
            react : "react",
            _      : "lodash",
            $     : "jquery",
            jQuery: "jquery",
            moment : "moment",
            graphql: "graphql",
            fetch  : "isomorphic-unfetch",
            // mongoose: "mongoose",
        }),
    ],
    externals: [nodeExternals()],

    module: {
        rules: [
            {
                test   : /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use    : {
                    loader : "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],

                        plugins: [
                            ["@babel/plugin-proposal-decorators", {"legacy": true}],
                            ["@babel/plugin-proposal-class-properties", {"loose": true}],
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                use : {
                    loader: "ignore-loader"
                }
            },
        ],
    },
};