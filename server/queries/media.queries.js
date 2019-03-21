import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt} from "graphql";

import MediaType      from "types/media.type";
import {getMediaById} from "../services/query.service";

//`${API}/posts?per_page=10&author=${authorId}&_embed`);


const MediaQueries = {
    getMediaById: {
        type   : MediaType,
        args   : {
            id: {type: GraphQLID},
        },
        resolve: async (parent, args) => getMediaById(args.id)
    },
};

export default MediaQueries;
// module.exports = TypeQueries;