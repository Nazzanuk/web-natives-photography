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
const GetSetBySlug = async (slug) => {
    let __args = {slug};

    const object = {
        query: {
            set: {
                __aliasFor: 'getSetBySlug',
                __args,

                id      : true,
                title   : true,
                summary : true,
                slug    : true,
                name    : true,
                projects: {
                    id     : true,
                    title  : true,
                    slug   : true,
                    summary: true,
                    name   : true,
                    images : {
                        id         : true,
                        filename   : true,
                        url        : true,
                        title      : true,
                        description: true,
                        caption    : true,
                    }
                }
            }
        },
    };

    return RequestService.Query("GetSetBySlug", object);
};

export default GetSetBySlug;