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
const GetCategoryBySlug = async (slug) => {
    let __args = {slug};

    const object = {
        query: {
            category: {
                __aliasFor: 'getCategoryBySlug',
                __args,

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
    };

    return RequestService.Query("GetCategoryBySlug", object);
};

export default GetCategoryBySlug;

