import "babel-polyfill";
import {jsonToGraphQLQuery} from "json-to-graphql-query";

import {BASE}         from "constants/config.constants";
// import AlertStore from "stores/alert.store";


const RequestService = {
    /**
     *
     * @param {String} name - Query Name
     * @param {Object} object - QL JSON data to send
     * @param {function=} onSuccess - function to run if no errors are returned
     * @return {Promise<*>} - JSON Response
     */
    Query: async (name, object, onSuccess) => {
        const query = jsonToGraphQLQuery(object, {pretty: true});

        const response = await fetch(`${BASE}/graphql?cache=${_.random(0, 1000000)}`, {
            method : "POST",
            headers: {"Content-Type": "application/json"},
            body   : JSON.stringify({query}),
        });


        const json = (await response.json());

        if (!response.ok || json.errors) {

            console.warn(`${name} request failed`, json);
            // AlertStore.showAlert({
            //     type : "error",
            //     title: "Error in Request",
            //     text : _.get(json, "errors[0].message"),
            // });

            return false;
        }

        if (onSuccess) {
            onSuccess(json.data);
        }

        // console.info(name, json.data);

        return json.data;
    },
};

export default RequestService;