import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt} from "graphql";

import UserType      from "types/user.type";
import {getUserById} from "../services/query.service";

//`${API}/posts?per_page=10&author=${authorId}&_embed`);


const UserQueries = {
    getUserById: {
        type   : UserType,
        args   : {
            id: {type: GraphQLID},
        },
        resolve: async (parent, args) => getUserById(args.id)
    },
};

export default UserQueries;
// module.exports = TypeQueries;