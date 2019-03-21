import {store, view} from "react-easy-state";

// import {API, ACF_API} from "constants/config.constants";

let timeout;

const LiveStore = store({
    isNewsletterPopupVisible: false,
    showSidebar             : false,
    atTop                   : true,
    isContentVisible        : false,

    Init() {

    },

    SetTop(flag) {
        LiveStore.atTop = flag;
    },

    HidePage() {
        LiveStore.isContentVisible = false;
        LiveStore.atTop            = true;

        if (process.browser) {
            window.scrollTo(0, 0);
        }
    },

    ShowPage() {
        LiveStore.isContentVisible = true;
    },

    ChangePage() {
        LiveStore.HidePage();
        // LiveStore.isContentVisible = false
        clearTimeout(timeout);
        timeout = setTimeout(() => LiveStore.isContentVisible = true, 200);
    },

    ToggleSidebar() {
        LiveStore.showSidebar = !LiveStore.showSidebar;
    },

    ShowNewsletterPopup() {
        LiveStore.isNewsletterPopupVisible = true;
    },

    HideNewsletterPopup() {
        LiveStore.isNewsletterPopupVisible = false;
    },
});

export default LiveStore;