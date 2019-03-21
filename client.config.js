const path    = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


require("style-loader");
require("css-loader");
require("sass-loader");

module.exports = {
    entry  : {
        app: ["./app/app.js"],
    },
    output : {
        filename: "[name].build.js",
        path    : path.resolve(__dirname, "static"),
    },
    mode   : "development",
    target : "web",
    resolve: {
        modules: [
            "node_modules",
            path.resolve("./app/"),
            // path.resolve("./static/"),
        ],
    },

    plugins: [
        new webpack.ProvidePlugin({
            React : "react",
            react : "react",
            _     : "lodash",
            $     : "jquery",
            jQuery: "jquery",
            moment: "moment",
            fetch : "isomorphic-unfetch",
        }),
        new MiniCssExtractPlugin({
            filename     : "app.build.css",
        }),
    ],
    cache  : true,
    devtool: "source-map",

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
                use : [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true,
                    },
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true,
                    },
                }],
            },
        ],
    },
};