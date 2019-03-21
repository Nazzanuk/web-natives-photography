import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLScalarType, GraphQLInt} from "graphql";
import {getCategoryById, getProjectById}                                                         from "../services/query.service";
import ProjectType                                                                               from "./project.type";

const SetType = new GraphQLObjectType({
    name  : "Set",
    fields: () => ({
        id      : {type: GraphQLInt},
        title   : {type: GraphQLString},
        summary : {type: GraphQLString},
        slug    : {type: GraphQLString},
        // link       : {type: GraphQLString},
        name    : {type: GraphQLString},
        // taxonomy   : {type: GraphQLString},
        projects: {
            type   : new GraphQLList(ProjectType),
            resolve: async (parent, args) => _(parent.projects).map(project => getProjectById(project)).values()
        },
    }),
});

export default SetType;

