import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLScalarType, GraphQLInt} from "graphql";

const MediaType = new GraphQLObjectType({
    name  : "Media",
    fields: () => ({
        id         : {type: GraphQLID},
        // count      : {type: GraphQLInt},
        title      : {type: GraphQLString},
        // description: {type: GraphQLString},
        caption    : {type: GraphQLString},
        url        : {type: GraphQLString},
        largeUrl   : {type: GraphQLString},
    }),
});

export default MediaType;

