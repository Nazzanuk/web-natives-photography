import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLScalarType, GraphQLInt} from "graphql";

const ImageType = new GraphQLObjectType({
    name  : "Image",
    fields: () => ({
        id         : {type: GraphQLInt},
        filename   : {type: GraphQLString},
        url        : {type: GraphQLString},
        title      : {type: GraphQLString},
        description: {type: GraphQLString},
        caption    : {type: GraphQLString},
    }),
});

export default ImageType;

