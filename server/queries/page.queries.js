import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt} from "graphql";

import fetch from "isomorphic-unfetch";

import PageType                         from "types/page.type";
import {NormalizePage}                  from "services/normalize.service";
import {getPageById, getPageBySlug} from "../services/query.service";

const PageQueries = {

    getPageById: {
        type   : PageType,
        args   : {
            id: {type: GraphQLID},
        },
        resolve: async (parent, args) => getPageById(args.id)
    },

    getPageBySlug: {
        type   : PageType,
        args   : {
            slug: {type: GraphQLString},
        },
        resolve: async (parent, args) => getPageBySlug(args.slug)
    },
};

export default PageQueries;