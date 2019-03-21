import {store, view} from "react-easy-state";

import {API, ACF_API} from "constants/config.constants";


const PageStore = store({
    pages: {},
    slug : undefined,

    Init(store) {
        _.merge(PageStore, store);
        // console.log("Init PageStore", PageStore);
    },

    GetPage(slug = PageStore.slug) {
        return PageStore.pages[slug] || {};
    },

    async LoadPage(slug) {
        if (PageStore.pages[slug]) return;

        console.info("Loading Page", slug);

        const res = await fetch(`${API}/pages?slug=${slug}`);

        PageStore.pages[slug] = (await res.json())[0];
    },

    async LoadPagesBySlugs(slugs) {
        _.each(slugs, slug => {
            if (PageStore.pages[slug]) {
                return;
            }
            console.info("Loading Page", slug);

            PageStore.pages[slug] = {};
            PageStore.LoadPage(slug);
        });
    },
});

export default PageStore;

export const GetPage         = PageStore.GetPage;
export const LoadPage         = PageStore.LoadPage;
export const LoadPagesBySlugs = PageStore.LoadPagesBySlugs;