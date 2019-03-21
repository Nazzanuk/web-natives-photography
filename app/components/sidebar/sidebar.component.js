import "./sidebar.component.scss";

import {store, view} from "react-easy-state";
import {Link}        from "react-router-dom";
import {Helmet}      from "react-helmet";
import LiveStore     from "stores/live.store";
import PostStore     from "stores/post.store";
import {GetOption}   from "stores/option.store";


const SidebarComponent = () => {

    const posts = _.take(PostStore.latestPosts, 3);

    const general        = _.get(GetOption("general"), "acf");
    const menuCategories = _.get(general, "menuCategories") || [];
    const menuPageLinks  = _.get(general, "menuPageLinks") || [];

    // console.log('menuPageLinks', menuPageLinks);

    return (
        <div data-component="sidebar" data-active={LiveStore.showSidebar}>
            <div className="sidebar-background" onClick={LiveStore.ToggleSidebar}/>
            <div className="sidebar" onClick={LiveStore.ToggleSidebar}>
                <div className="sidebar-x">
                    <i className="fal fa-times"/>
                </div>

                <div className="menu-group">
                    {/*<div className="group-title">The Platform</div>*/}
                    <div className="group-links">

                        {_.map(menuPageLinks, (page, index) => (
                            <Link to={`/${_.get(page, "post_name")}`} key={index} className="group-link">
                                {_.get(page, "post_title")}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="menu-group">
                    <div className="group-title">Trending</div>
                    <div className="group-links">
                        {_.map(posts, (post, index) => (
                            <Link to={`/articles/${_.get(post, "slug")}`} key={index} className="group-link">
                                {_.get(post, "title.rendered")}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="menu-group">
                    <div className="group-title">Categories</div>
                    <div className="group-links">

                        {menuCategories.map((category, index) =>
                            <Link to={`/category/${category["term_id"]}/${category.slug}`} key={index} className="group-link">
                                {category.name}
                            </Link>,
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default view(SidebarComponent);