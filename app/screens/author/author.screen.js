import "./author.screen.scss";

import {store, view} from "react-easy-state";
import {Link}        from "react-router-dom";
import {Helmet}      from "react-helmet";
import {Component}   from "react";

import PromosComponent from "components/promos/promos.component";

import LiveStore                              from "stores/live.store";
import AuthorStore                            from "stores/author.store";
import PostStore                              from "stores/post.store";
import PageStore, {LoadPage}                  from "stores/page.store";
import NavStore, {GetRouteData, GetRouteSlug} from "stores/nav.store";


class AuthorScreen extends Component {

    constructor(props) {
        super(props);

        PostStore.LoadPostsByAuthor(NavStore.id);
    }

    render() {
        const posts  = PostStore.authors[NavStore.id];
        const author = GetRouteData();

        console.log("AuthorScreen author", author);
        console.log("AuthorScreen posts", posts);

        return (
            <div data-screen="author" data-visible={LiveStore.isContentVisible}>
                <Helmet>
                    <title>{_.get(author, "name")} | The Platform UK</title>
                </Helmet>

                <div className="author">

                    <div className={`section section-alt`}>
                        <div className="container">
                            <div className="section-label">
                                Articles by&nbsp; <span dangerouslySetInnerHTML={{__html: _.get(author, "name")}}/>
                            </div>

                            <PromosComponent articles={posts} isFormatted={true}/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default view(AuthorScreen);