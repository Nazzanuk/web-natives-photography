import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt} from "graphql";

import fetch from "isomorphic-unfetch";

import ArticleType        from "types/article.type";
import {NormalizeArticle} from "services/normalize.service";
import {
    getArticleById, getLatestArticles, getArticleBySlug,
    getArticlesByCategoryId, getArticlesByCategorySlug,
}                         from "services/query.service";


const ArticleQueries = {

    getArticlesByCategoryId: {
        type   : new GraphQLList(ArticleType),
        args   : {
            categoryId: {type: new GraphQLNonNull(GraphQLInt)},
            perPage   : {type: GraphQLInt},
            page      : {type: GraphQLInt},
        },
        resolve: async (parent, args) => getArticlesByCategoryId(args),
    },

    getArticlesByCategorySlug: {
        type   : new GraphQLList(ArticleType),
        args   : {
            categorySlug: {type: new GraphQLNonNull(GraphQLString)},
            perPage     : {type: GraphQLInt},
            page        : {type: GraphQLInt},
        },
        resolve: async (parent, args) => getArticlesByCategorySlug(args),
    },

    getLatestArticles: {
        type   : new GraphQLList(ArticleType),
        args   : {
            perPage: {type: GraphQLInt},
        },
        resolve: async (parent, args) => getLatestArticles(args.perPage),
    },

    getArticleById: {
        type   : ArticleType,
        args   : {
            id: {type: GraphQLID},
        },
        resolve: async (parent, args) => getArticleById(args.id),
    },

    getArticleBySlug: {
        type   : ArticleType,
        args   : {
            slug: {type: GraphQLString},
        },
        resolve: async (parent, args) => getArticleBySlug(args.slug),
    },
};

export default ArticleQueries;