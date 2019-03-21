import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt} from "graphql";

import ProjectType      from "types/project.type";
import {getProjectById, getProjectBySlug} from "../services/query.service";

//`${API}/posts?per_page=10&author=${authorId}&_embed`);


const ProjectQueries = {
    getProjectById: {
        type   : ProjectType,
        args   : {
            id: {type: GraphQLID},
        },
        resolve: async (parent, args) => getProjectById(args.id)
    },

    getProjectBySlug: {
        type   : ProjectType,
        args   : {
            slug: {type: GraphQLString},
        },
        resolve: async (parent, args) => getProjectBySlug(args.slug)
    },
};

export default ProjectQueries;
// module.exports = TypeQueries;