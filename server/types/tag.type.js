import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLScalarType, GraphQLInt} from "graphql";

const TagType = new GraphQLObjectType({
    name  : "Tag",
    fields: () => ({
        id         : {type: GraphQLID},
        count      : {type: GraphQLInt},
        description: {type: GraphQLString},
        slug       : {type: GraphQLString},
        link       : {type: GraphQLString},
        name       : {type: GraphQLString},
        taxonomy   : {type: GraphQLString},
    }),
});

export default TagType;

