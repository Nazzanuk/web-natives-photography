import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt} from "graphql";

import SetType      from "types/set.type";
import {getSetById, getSetBySlug} from "../services/query.service";

//`${API}/posts?per_page=10&author=${authorId}&_embed`);


const SetQueries = {
    getSetById: {
        type   : SetType,
        args   : {
            id: {type: GraphQLID},
        },
        resolve: async (parent, args) => getSetById(args.id)
    },

    getSetBySlug: {
        type   : SetType,
        args   : {
            slug: {type: GraphQLString},
        },
        resolve: async (parent, args) => getSetBySlug(args.slug)
    },
};

export default SetQueries;
// module.exports = TypeQueries;