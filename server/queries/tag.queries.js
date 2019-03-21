import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt} from "graphql";

import TagType      from "types/tag.type";
import {getTagById} from "../services/query.service";

//`${API}/posts?per_page=10&author=${authorId}&_embed`);


const TagQueries = {
    getTagById: {
        type   : TagType,
        args   : {
            id: {type: GraphQLID},
        },
        resolve: async (parent, args) => getTagById(args.id)
    },
};

export default TagQueries;
// module.exports = TypeQueries;