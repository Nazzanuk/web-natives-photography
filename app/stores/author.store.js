import {store, view} from "react-easy-state";

import {API, ACF_API} from "constants/config.constants";


const AuthorStore = store({
    authors: {},

    Init(store) {
        _.merge(AuthorStore, store);
    },

    GetAuthor(id) {
        // if (!AuthorStore.authors[id]) {
        //     LoadAuthor(id);
        // }

        return AuthorStore.authors[id] || {};
    },

    async LoadAuthor(id) {
        if (AuthorStore.authors[id]) return;

        console.info("Loading Author", id);

        AuthorStore.authors[id] = {};

        const res = await fetch(`${API}/users/${id}`);

        AuthorStore.authors[id] = await res.json();
    },

    async LoadAllAuthors() {

        const res = await fetch(`${API}/users?posts-per_page=100`);

        const authors = await res.json();

        _.each(authors, author => AuthorStore.authors[author.slug] = author);
    },
});

export default AuthorStore;

export const GetAuthor      = AuthorStore.GetAuthor;
export const LoadAuthor     = AuthorStore.LoadAuthor;
export const LoadAllAuthors = AuthorStore.LoadAllAuthors;

LoadAllAuthors();