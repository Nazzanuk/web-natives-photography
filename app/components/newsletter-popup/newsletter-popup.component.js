import "./newsletter-popup.component.scss";

import {store, view} from "react-easy-state";
import {Link}        from "react-router-dom";
import {Helmet}      from "react-helmet";
import LiveStore     from "stores/live.store";
import PostStore     from "stores/post.store";
import {GetOption}   from "stores/option.store";


const NewsletterPopupComponent = () => {

    const posts = _.take(PostStore.latestPosts, 3);

    const general        = _.get(GetOption("general"), "acf");
    const menuCategories = _.get(general, "menuCategories") || [];
    const menuPageLinks  = _.get(general, "menuPageLinks") || [];

    console.log("menuPageLinks", menuPageLinks);

    return (
        <div data-component="newsletter-popup" data-active={LiveStore.isNewsletterPopupVisible}>
            {/*<div className="newsletter-popup-background" onClick={LiveStore.HideNewsletterPopup}/>*/}
            <div className="newsletter-popup" onClick={LiveStore.HideNewsletterPopup}>
                <div className="sidebar-x">
                    <i className="fal fa-times"/>
                </div>


            </div>
        </div>
    );
};


export default view(NewsletterPopupComponent);