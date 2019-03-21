import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLScalarType} from "graphql";

import UserType                                                                 from "./user.type";
import SetType                                                                  from "./category.type";
import {getArticleById, getMediaById, getCategoryById, getTagById, getUserById} from "../services/query.service";
import TagType                                                                  from "./tag.type";
import MediaType                                                                from "./media.type";


const ArticleType = new GraphQLObjectType({
    name  : "Article",
    fields: () => ({
        id           : {type: GraphQLID},
        date         : {type: GraphQLString},
        slug         : {type: GraphQLString},
        type         : {type: GraphQLString},
        // link      : {type: GraphQLString},
        content      : {type: GraphQLString},
        title        : {type: GraphQLString},
        excerpt      : {type: GraphQLString},
        summary      : {type: GraphQLString},
        components   : {type: GraphQLString},
        // acf       : {type: GraphQLString},
        author       : {
            type   : UserType,
            resolve: async (parent, args) => getUserById(parent.author)
        },
        featuredImage: {
            type   : MediaType,
            resolve: async (parent, args) => getMediaById(parent.featuredImage)
        },
        categories   : {
            type   : new GraphQLList(SetType),
            resolve: async (parent, args) => _(parent.categories).map(category => getCategoryById(category)).values()
        },
        tags         : {
            type   : new GraphQLList(TagType),
            resolve: async (parent, args) => _(parent.tags).map(tag => getTagById(tag)).values()
        },
    }),
});

export default ArticleType;

