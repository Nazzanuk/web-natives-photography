import {GraphQLObjectType, GraphQLSchema} from "graphql";

// import UserQueries     from "queries/user.queries";
import SetQueries     from "queries/set.queries";
import ProjectQueries from "queries/project.queries";
// import EventQueries from "queries/event.queries";
// import AuthQueries  from "queries/auth.queries";
// import TypeQueries  from "queries/type.queries";
// import ArticleQueries  from "queries/article.queries";
// import MediaQueries    from "queries/media.queries";
// import PageQueries     from "queries/page.queries";


const RootQuery = new GraphQLObjectType({
    name  : "RootQueryType",
    fields: {
        // ...ArticleQueries,
        // ...PageQueries,
        ...SetQueries,
        ...ProjectQueries,
        // ...MediaQueries,
        // ...EventQueries,
        // ...TypeQueries,
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
});

export default schema;