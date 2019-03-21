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
const GetProjectBySlug = async (slug) => {
    let __args = {slug};

    const object = {
        query: {
            project: {
                __aliasFor: 'getProjectBySlug',
                __args,

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
        },
    };

    return RequestService.Query("GetProjectBySlug", object);
};

export default GetProjectBySlug;