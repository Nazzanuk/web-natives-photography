import Route         from "route-parser";
import {store, view} from "react-easy-state";

import {API, ACF_API} from "constants/config.constants";

import PageStore, {LoadPage, GetPage}       from "stores/page.store";
import PostStore, {LoadPost, GetPost}       from "stores/post.store";
import AuthorStore, {LoadAuthor, GetAuthor} from "stores/author.store";

import PageScreen    from "screens/page/page.screen";
import ArticleScreen from "screens/article/article.screen";

// const route = new Route("/my/fancy/route/page/:page");
// route.match("/my/fancy/route/page/7"); // { page: 7 }
// route.reverse({page: 3}); // -> '/my/fancy/route/page/3'

const routes = [
    {
        type   : "author",
        route  : new Route("/author/:id/:slug"),
        load   : AuthorStore.LoadAuthor,
        getData: AuthorStore.GetAuthor,
    },
    {
        type   : "category",
        route  : new Route("/category/:id/:slug"),
        load   : PostStore.LoadPostsByCategory,
        getData: PostStore.GetPostsByCategory,
    },
    {
        type   : "tag",
        route  : new Route("/tag/:slug"),
        load   : PostStore.LoadPostsByTag,
        getData: PostStore.GetPostsByTag,
    },
    {
        type   : "article",
        route  : new Route("/articles/:slug"),
        load   : LoadPost,
        getData: GetPost,
    },
    {
        type   : "article",
        route  : new Route("/articles/:slug/"),
        load   : LoadPost,
        getData: GetPost,
    },
    {
        type   : "page",
        slug   : "home",
        route  : new Route("/"),
        load   : LoadPage,
        getData: GetPage,
    },
    {
        type   : "page",
        route  : new Route("/:slug"),
        load   : LoadPage,
        getData: GetPage,
    },
    {
        type   : "page",
        route  : new Route("/:slug/"),
        load   : LoadPage,
        getData: GetPage,
    },
];

const NavStore = store({
    path : undefined,
    slug : undefined,
    id   : undefined,
    type : "page",
    route: undefined,
    // screen: undefined,

    Init(store) {
        _.merge(NavStore, store);
        // console.log("Init NavStore", store);
    },

    GetRouteSlug() {
        return NavStore.slug;
    },

    GetRouteType() {
        return NavStore.type;
    },

    IsRouteType(type) {
        return type == NavStore.type;
    },

    GetRoute() {
        return NavStore.route;
    },

    GetScreen() {
        return NavStore.screen;
    },

    GetRouteData() {
        // console.log("GetRouteDat NavStoree", NavStore);
        // console.log("GetRouteData PageStore", PageStore);
        // console.log("GetRouteData.route", NavStore.route);

        // if (!_.get(NavStore, "route.getData")) return {};
        return _.find(routes, {type: NavStore.type}).getData(NavStore.id || NavStore.slug);
    },

    async SetRoute(path) {
        console.log("SetRoute", path);
        NavStore.path = path;

        _.eachRight(routes, route => {
            let match = route.route.match(path);
            console.log("route.match(path)", match);

            if (match) {
                NavStore.route   = route;
                NavStore.type    = route.type;
                NavStore.getData = route.getData;
                NavStore.screen  = route.screen;
                NavStore.slug    = match.slug || route.slug;
                NavStore.id      = match.id;
            }
        });

        await NavStore.LoadRoute();
    },

    async LoadRoute() {
        await NavStore.route.load(NavStore.id || NavStore.slug);
    },
});

export default NavStore;

export const GetRoute     = NavStore.GetRoute;
export const SetRoute     = NavStore.SetRoute;
export const LoadRoute    = NavStore.LoadRoute;
export const GetRouteType = NavStore.GetRouteType;
export const GetRouteSlug = NavStore.GetRouteSlug;
export const GetScreen    = NavStore.GetScreen;
export const GetRouteData = NavStore.GetRouteData;
export const IsRouteType  = NavStore.IsRouteType;