import path from "path";
import "babel-polyfill";


// let fs = require("fs");

import React          from "react";
import ReactDOMServer from "react-dom/server";

import App from "../app/app.js";

import {ApolloServer, gql} from "apollo-server-hapi";
import Hapi                from "hapi";
import Inert               from "inert";

import fs                        from "fs";
import schema                    from "./graphql/schema";
import GetArticleBySlug          from "../app/requests/get-article-by-slug.request";
import {StaticRouter}            from "react-router";
import {Helmet}                  from "react-helmet";
import GetArticlesByCategorySlug from "../app/requests/get-articles-by-category-slug.request";
import GetCategoryBySlug         from "../app/requests/get-category-by-slug.request";


const port = process.env.PORT || 4040;


const appHtml = fs.readFileSync(path.resolve("./app/app.html"), "utf8");

async function StartServer() {
    const apolloServer = new ApolloServer({schema});

    const hapiServer = new Hapi.server({
        port: port,
    });

    await hapiServer.register(Inert);

    hapiServer.route({
        method : "GET",
        path   : "/static/{param*}",
        handler: {
            directory: {
                path   : "static",
                listing: true,
            },
        },
    });

    hapiServer.route({
        method : "GET",
        path   : "/articles/{articleSlug*}",
        handler: async (request, h) => {
            console.log("/articles/{articleSlug}");
            const {article} = await GetArticleBySlug(request.params.articleSlug);

            let app = (
                <StaticRouter location={request.path} context={{}}>
                    <App article={article}/>
                </StaticRouter>
            );

            let html = appHtml.replace(
                "<div id=\"app\"></div>",
                `<div id="app">${ReactDOMServer.renderToString(app)}</div>`,
            );

            const helmet = Helmet.renderStatic();

            console.log("helmet", helmet.title.toString());

            return html;
        },
    });

    hapiServer.route({
        method : "GET",
        path   : "/category/{categorySlug*}",
        handler: async (request, h) => {
            console.log("/category/{categorySlug}");

            const {posts: articles} = await GetArticlesByCategorySlug(request.params.categorySlug);
            const {category}        = await GetCategoryBySlug(request.params.categorySlug);

            let app = (
                <StaticRouter location={request.path} context={{}}>
                    <App articles={articles} category={category}/>
                </StaticRouter>
            );

            let html = appHtml.replace(
                "<div id=\"app\"></div>",
                `<div id="app">${ReactDOMServer.renderToString(app)}</div>`,
            );

            const helmet = Helmet.renderStatic();

            console.log("helmet", helmet.title.toString());

            return html;
        },
    });

    hapiServer.route({
        method : "GET",
        path   : "/{param*}",
        handler: function (request, h) {
            console.log("/{param*}");

            return appHtml;


            console.log("ReactDOMServer.renderToStaticMarkup(<App/>)", ReactDOMServer.renderToString(<App/>));

            return appHtml.replace(
                "<div id=\"app\"></div>",
                `<div id="app">${ReactDOMServer.renderToString(<App/>)}</div>`,
            );
        },
    });

    await apolloServer.applyMiddleware({app: hapiServer});

    await apolloServer.installSubscriptionHandlers(hapiServer.listener);

    await hapiServer.start();

    console.log("Server running at:", hapiServer.info.uri);
}

StartServer().catch(error => console.log(error));
