import fetch     from "isomorphic-unfetch";

import {NormalizeArticle, NormalizeMedia, NormalizeUser, NormalizePage, NormalizeProject, NormalizeSet} from "./normalize.service";
import {myCache}                                                                                        from "../server";

const API     = "http://206.189.113.211/wp-json/wp/v2";
// const ACF_API = "https://admin.platformonline.uk/wp-json/acf/v3";

let requests = {
    getTagById: async (tagId) => {
        console.log("getTagById", tagId);

        const res = await fetch(`${API}/tags/${tagId}`);
        const tag = await res.json();

        return tag;
    },

    getMediaById: async (mediaId) => {
        console.log("getMediaById", mediaId);

        const res   = await fetch(`${API}/media/${mediaId}`);
        const media = await res.json();

        return NormalizeMedia(media);
    },

    getProjectById: async (projectId) => {
        console.log("getProjectById", projectId);

        const res = await fetch(`${API}/projects/${projectId}`);
        const project = await res.json();
        return NormalizeProject(project);
    },

    getProjectBySlug: async (projectSlug) => {
        console.log("getProjectBySlug", projectSlug);

        const res = await fetch(`${API}/projects/?slug=${projectSlug}`);
        const project = (await res.json())[0];
        return NormalizeProject(project);
    },

    getSetById: async (setId) => {
        console.log("getSetById", setId);

        const res = await fetch(`${API}/sets/${setId}`);
        const set = await res.json();
        return NormalizeSet(set);
    },

    getSetBySlug: async (setSlug) => {
        console.log("getSetBySlug", setSlug);

        const res = await fetch(`${API}/sets/?slug=${setSlug}`);
        const set = (await res.json())[0];
        return NormalizeSet(set);
    },

    getUserById: async (userId) => {
        console.log("getUserById", userId);

        const res  = await fetch(`${API}/users/${userId}`);
        const user = await res.json();
        return NormalizeUser(user);
    },

    getArticleById: async (articleId) => {
        console.log("getArticleById", articleId);

        const res     = await fetch(`${API}/posts/${articleId}`);
        const article = await res.json();
        return NormalizeArticle(article);
    },

    getArticleBySlug: async (articleSlug) => {
        console.log("getArticleBySlug", articleSlug);

        const res     = await fetch(`${API}/posts/?slug=${articleSlug}`);
        const article = (await res.json())[0];
        return NormalizeArticle(article);
    },

    getPageById: async (pageId) => {
        console.log("getPageById", pageId);

        const res  = await fetch(`${API}/pages/${pageId}`);
        const page = await res.json();
        return NormalizePage(page);
    },

    getPageBySlug: async (pageSlug) => {
        console.log("getPageBySlug", pageSlug);

        const res  = await fetch(`${API}/pages/?slug=${pageSlug}`);
        const page = (await res.json())[0];
        return NormalizePage(page);
    },

    getLatestArticles: async (perPage) => {
        console.log("getLatestArticles", perPage);

        const res      = await fetch(`${API}/posts?per_page=${perPage}`);
        const articles = await res.json();
        return _(articles).map(NormalizeArticle).value();
    },

    getArticlesBySetId: async ({setId, perPage = 20, page = 1}) => {
        console.log("getArticlesBySetId", perPage);

        const res      = await fetch(`${API}/posts?per_page=${perPage}&page=${page}&sets=${setId}`);
        const articles = await res.json();
        return _(articles).map(NormalizeArticle).value();
    },

    getArticlesBySetSlug: async ({setSlug, perPage = 20, page = 1}) => {
        console.log("getArticlesBySetSlug", perPage);

        const {id: setId} = await getSetBySlug(setSlug);

        const res      = await fetch(`${API}/posts?per_page=${perPage}&page=${page}&sets=${setId}`);
        const articles = await res.json();
        return _(articles).map(NormalizeArticle).value();
    },

    cacheArticles: async (max) => {
        console.log("cacheArticles", max);
        let pages  = Math.ceil(max / 100);
        let amount = max > 100 ? 100 : max;

        for (let page = 1; page <= pages; page++) {
            const res      = await fetch(`${API}/posts?per_page=${amount}`);
            const articles = await res.json();
            _(articles).each(article => {
                console.log("caching", `getArticleById:[${article.id}]`);
                myCache.set(`getArticleById:[${article.id}]`, article);
            });
        }
    },

    cacheUsers: async (max) => {
        console.log("cacheUsers", max);
        let pages  = Math.ceil(max / 100);
        let amount = max > 100 ? 100 : max;

        for (let page = 1; page <= pages; page++) {
            const res   = await fetch(`${API}/users?per_page=${amount}`);
            const users = await res.json();
            _(users).each(user => {
                console.log("caching", `getUserById:[${user.id}]`);
                myCache.set(`getUserById:[${user.id}]`, user);
            });
        }
    },

    cacheSets: async (max) => {
        console.log("cacheSets", max);
        let pages  = Math.ceil(max / 100);
        let amount = max > 100 ? 100 : max;

        for (let page = 1; page <= pages; page++) {
            const res  = await fetch(`${API}/sets?per_page=${amount}&page=${page}`);
            const sets = await res.json();
            _(sets).each(set => {
                console.log("caching", `getSetById:[${set.id}]`);
                myCache.set(`getSetById:[${set.id}]`, set);
            });
        }
    },

    cacheTags: async (max) => {
        console.log("cacheTags", max);
        let pages  = Math.ceil(max / 100);
        let amount = max > 100 ? 100 : max;

        for (let page = 1; page <= pages; page++) {
            const res  = await fetch(`${API}/tags?per_page=${amount}&page=${page}`);
            const tags = await res.json();
            _(tags).each(tag => {
                console.log("caching", `getTagById:[${tag.id}]:`);
                myCache.set(`getTagById:[${tag.id}]`, tag);
            });
        }

    },

    cacheMedia: async (max) => {
        console.log("cacheMedia", max);
        let pages  = Math.ceil(max / 100);
        let amount = max > 100 ? 100 : max;

        for (let page = 1; page <= pages; page++) {
            const res    = await fetch(`${API}/media?per_page=${amount}&page=${page}`);
            const medias = await res.json();
            _(medias).each(media => {
                console.log("caching", `getMediaById:[${media.id}]:`);
                myCache.set(`getMediaById:[${media.id}]`, media);
            });
        }

    },
};

const cacheMethod = (method) => {
    return async (...args) => {
        let cache = myCache.get(`${method}:${JSON.stringify(args)}`);

        console.log(`checking cache: ${method}:${JSON.stringify(args)}`);

        if (cache) {
            console.log(`returning cached version`);
            return cache;
        }
        console.log(`Manually fetching`);

        let res = await requests[method].apply(this, args);

        myCache.set(`${method}:${JSON.stringify(args)}`, res);

        return res;
    };
};

export const getTagById           = cacheMethod("getTagById");
export const getMediaById         = cacheMethod("getMediaById");
export const getUserById          = cacheMethod("getUserById");
export const getArticleById       = cacheMethod("getArticleById");
export const getArticleBySlug     = cacheMethod("getArticleBySlug");
export const getPageById          = cacheMethod("getPageById");
export const getPageBySlug        = cacheMethod("getPageBySlug");
export const getLatestArticles    = cacheMethod("getLatestArticles");
export const getArticlesBySetId   = cacheMethod("getArticlesBySetId");
export const getArticlesBySetSlug = cacheMethod("getArticlesBySetSlug");
export const cacheArticles        = requests.cacheArticles;
export const cacheUsers           = requests.cacheUsers;
export const cacheSets            = requests.cacheSets;
export const cacheMedia           = requests.cacheMedia;
export const cacheTags            = requests.cacheTags;


export const getSetById           = cacheMethod("getSetById");
export const getSetBySlug         = cacheMethod("getSetBySlug");
export const getProjectById           = cacheMethod("getProjectById");
export const getProjectBySlug         = cacheMethod("getProjectBySlug");
// const init = () => {
//     cacheArticles(500);
//     cacheUsers(100);
//     cacheMedia(1000);
//     cacheSets(100);
//     cacheTags(3000);
// };

// init();