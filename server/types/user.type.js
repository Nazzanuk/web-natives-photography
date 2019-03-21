import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLScalarType} from "graphql";

import _ from "lodash";


const UserType = new GraphQLObjectType({
    name  : "User",
    fields: () => ({
        id             : {type: GraphQLID},
        // description    : {type: GraphQLString},
        slug           : {type: GraphQLString},
        // type           : {type: GraphQLString},
        link           : {type: GraphQLString},
        name           : {type: GraphQLString},
        profileImage   : {type: GraphQLString},
        backgroundImage: {type: GraphQLString},
        // title: {type: GraphQLString},
        // acf  : {},
    }),
});

export default UserType;

