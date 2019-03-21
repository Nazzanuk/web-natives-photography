import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt} from "graphql";
import {getProjectById}                                                                          from "../services/query.service";
import ImageType                                                                                 from "./image.type";

const ProjectType = new GraphQLObjectType({
    name  : "Project",
    fields: () => ({
        id     : {type: GraphQLInt},
        title  : {type: GraphQLString},
        summary: {type: GraphQLString},
        slug   : {type: GraphQLString},
        // link       : {type: GraphQLString},
        name   : {type: GraphQLString},
        images : {type: new GraphQLList(ImageType)},
    }),
});

export default ProjectType;

