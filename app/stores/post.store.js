import {store, view} from "react-easy-state";

import {API, ACF_API} from "constants/config.constants";
import PageStore      from "./page.store";


const PostStore = store({
    posts      : {},
    tags       : {},
    categories : {},
    authors    : {},
    slug       : undefined,
    latestPosts: [],
    randomPosts: [],

    Init(store) {
        // console.log("Init PostStore", store);
        _.merge(PostStore, store);
    },

    GetPost(slug = PostStore.slug) {
        return PostStore.posts[slug] || {};
    },

    GetPosts(slugs) {
        return _.map(slugs, slug => PostStore.GetPost(slug));
    },

    GetRandomPosts(amount = 100) {
        return _.take(PostStore.randomPosts, amount);
    },

    RandomisePosts() {
        return PostStore.randomPosts = _.shuffle(PostStore.randomPosts);
    },

    GetPostsByTag(tag) {
        return PostStore.tags[tag];
    },

    GetPostsByCategory(category) {
        return PostStore.categories[category];
    },

    GetPostsByAuthor(authorId) {
        return PostStore.authors[authorId];
    },

    GetLatestPosts() {
        return PostStore.latestPosts;
    },

    GetPostsByObjects() {
        const slugs = _.flatten(arguments).map(post => post["post_name"]);
        return PostStore.GetPosts(slugs);
    },

    // GetRandomPosts() {
    //     return _.values(PostStore.posts);
    // },

    async LoadPost(slug) {
        if (PostStore.posts[slug]) return;

        console.info("Loading Post", slug);

        PostStore.posts[slug] = {};

        const res = await fetch(`${API}/posts?slug=${slug}&_embed`);

        PostStore.posts[slug] = (await res.json())[0];
    },

    async LoadLatestPosts() {
        if (PostStore.latestPosts.length) return;

        const res = await fetch(`${API}/posts?per_page=10&_embed`);

        const latestPosts = await res.json();

        _.each(latestPosts, post => PostStore.posts[post.slug] = post);

        PostStore.latestPosts = _.take(latestPosts, 10);
        PostStore.randomPosts = _.shuffle(latestPosts);
    },

    async LoadPostsByTag(tag) {
        if (PostStore.tags[tag]) return;

        PostStore.tags[tag] = [];

        const res = await fetch(`${API}/posts?per_page=10&filter[tag]=${tag}&_embed`);

        const posts = await res.json();

        _.each(posts, post => PostStore.posts[post.slug] = post);

        PostStore.tags[tag] = posts;
    },

    async LoadPostsByAuthor(authorId) {
        if (PostStore.authors[authorId]) return;

        PostStore.authors[authorId] = [];

        const res = await fetch(`${API}/posts?per_page=10&author=${authorId}&_embed`);

        const posts = await res.json();

        _.each(posts, post => PostStore.posts[post.slug] = post);

        PostStore.authors[authorId] = posts;
    },

    async LoadPostsByCategory(category) {
        if (PostStore.categories[category]) return;

        PostStore.categories[category] = [];

        console.log(`${API}/posts?per_page=10&categories=${category}&_embed`);

        const res = await fetch(`${API}/posts?per_page=10&categories=${category}&_embed`);

        const posts = await res.json();

        _.each(posts, post => PostStore.posts[post.slug] = post);

        PostStore.categories[category] = posts;
    },

    async LoadPostsByObjects() {
        const slugs = _.flatten(arguments).map(post => post["post_name"]);
        PostStore.LoadPostsBySlugs(slugs);
    },

    async LoadPostsBySlugs() {
        const slugs = _.flatten(arguments);

        _.each(slugs, slug => PostStore.LoadPost(slug));
    },
});

export default PostStore;

export const GetPost             = PostStore.GetPost;
export const GetPosts            = PostStore.GetPosts;
export const GetPostsByObjects   = PostStore.GetPostsByObjects;
export const GetPostsByTag       = PostStore.GetPostsByTag;
export const GetPostsByCategory  = PostStore.GetPostsByCategory;
export const GetPostsByAuthor    = PostStore.GetPostsByAuthor;
export const GetLatestPosts      = PostStore.GetLatestPosts;
export const GetRandomPosts      = PostStore.GetRandomPosts;
export const LoadPost            = PostStore.LoadPost;
export const LoadLatestPosts     = PostStore.LoadLatestPosts;
export const LoadPostsBySlugs    = PostStore.LoadPostsBySlugs;
export const LoadPostsByObjects  = PostStore.LoadPostsByObjects;
export const LoadPostsByTag      = PostStore.LoadPostsByTag;
export const LoadPostsByCategory = PostStore.LoadPostsByCategory;
export const LoadPostsByAuthor   = PostStore.LoadPostsByAuthor;
// export const LoadRandomPosts   = PostStore.LoadRandomPosts;
export const RandomisePosts      = PostStore.RandomisePosts;