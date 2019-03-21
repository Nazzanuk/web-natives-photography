import {store, view} from "react-easy-state";

import {API, ACF_API} from "constants/config.constants";


const OptionStore = store({
    options: {},

    Init(store) {
        _.merge(OptionStore, store);
    },

    GetOption(slug) {
        return OptionStore.options[slug] || {};
    },

    async LoadOption(slug) {
        if (OptionStore.options[slug]) return;

        console.info("Loading Option", slug);

        OptionStore.options[slug] = {};

        const res = await fetch(`${API}/options?slug=${slug}&_embed`);

        OptionStore.options[slug] = (await res.json())[0];
    },

    async LoadAllOptions() {

        const res = await fetch(`${API}/options?posts-per_page=100&_embed`);

        const options = await res.json();

        _.each(options, option => OptionStore.options[option.slug] = option);
    },
});

export default OptionStore;

export const GetOption      = OptionStore.GetOption;
export const LoadOption     = OptionStore.LoadOption;
export const LoadAllOptions = OptionStore.LoadAllOptions;

LoadAllOptions();