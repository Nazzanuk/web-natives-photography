import "babel-polyfill";
import {jsonToGraphQLQuery} from "json-to-graphql-query";
import RequestService       from "../services/request.service";
import {GraphQLString}      from "graphql";


// /**
//  * Function to request a list of events
//  * @param {String} parameters.id - Event id
//  * @param {String} parameters.user - ID of the event user
//  * @param {String} parameters.creator - ID of the event creator
//  * @return {[Object]} events - events
//  */
const GetArticlesByCategorySlug = async (categorySlug) => {
    let __args = {categorySlug};

    const object = {
        query: {
            posts: {
                __aliasFor: 'getArticlesByCategorySlug',
                __args,

                id           : true,
                date         : true,
                slug         : true,
                type         : true,
                // link      : true,
                content      : true,
                title        : true,
                // visibleTitle : true,
                components   : true,
                excerpt      : true,
                featuredImage: {
                    id      : true,
                    title   : true,
                    caption : true,
                    url     : true,
                    largeUrl: true,
                },
                author       : {
                    id          : true,
                    slug        : true,
                    // link        : true,
                    name        : true,
                    profileImage: true,
                },
                categories   : {
                    id         : true,
                    description: true,
                    slug       : true,
                    // link       : true,
                    name       : true,
                    // taxonomy   : true,
                    parent     : {
                        id         : true,
                        description: true,
                        slug       : true,
                        // link       : true,
                        name       : true,
                        // taxonomy   : true,
                    }
                }
            },
        },
    };

    return RequestService.Query("GetArticlesByCategorySlug", object);
};

export default GetArticlesByCategorySlug;

