import "./hero.component.scss";

import {store, view} from "react-easy-state";

import {Link}   from "react-router-dom";
import {Helmet} from "react-helmet";

import PostStore, {GetPostsByObjects, LoadPostsByObjects} from "stores/post.store";
import {GetPostImageStyle}                                from "../../services/helper.service";


const HeroComponent = ({mainArticle, sideArticles}) => {

    // console.log("HeroComponent", mainArticle, sideArticles);

    LoadPostsByObjects(mainArticle, sideArticles);

    const Article  = GetPostsByObjects(mainArticle)[0];
    const Articles = GetPostsByObjects(sideArticles);

    // console.log("HeroComponent articles", Articles);

    return (
        <div data-component="hero">
            <div className="hero">
                <Link to={`/articles/${_.get(Article, "slug")}`} className="hero-main">
                    <div className="main-image" style={GetPostImageStyle(Article)}/>
                    <div className="main-overlay">
                        <div className="overlay-author" dangerouslySetInnerHTML={{__html: _.get(Article, `_embedded.author[0].name`)}}/>
                        <div className="overlay-title" dangerouslySetInnerHTML={{__html: _.get(Article, "title.rendered")}}/>
                        {/*<div className="overlay-stats">*/}
                        {/*<div className="overlay-stat">*/}
                        {/*<i className="fas fa-eye"/> 122 views*/}
                        {/*</div>*/}
                        {/*<div className="overlay-stat">*/}
                        {/*<i className="fas fa-heart" style={{color: "#f08d8e"}}/> 66 likes*/}
                        {/*</div>*/}
                        {/*<div className="overlay-stat">*/}
                        {/*<i className="fas fa-comments-alt" style={{color: "#57c4ef"}}/> 7 comments*/}
                        {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </Link>

                <div className="hero-items">
                    {Articles.map(article => (
                        <Link to={`/articles/${_.get(article, "slug")}`} className="hero-item">
                            <div className="item-image" style={GetPostImageStyle(article)}/>
                            <div className="item-overlay">
                                <div className="overlay-author">{_.get(article, `_embedded.author[0].name`)}</div>
                                <div className="overlay-title">{_.get(article, "title.rendered")}</div>
                                <div className="overlay-stats">
                                    <div className="overlay-stat">
                                        <i className="fas fa-eye"/> 322
                                    </div>
                                    <div className="overlay-stat">
                                        <i className="fas fa-heart"/> 46
                                    </div>
                                    <div className="overlay-stat">
                                        <i className="fas fa-comments-alt"/> 2
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>

            </div>

        </div>
    );
};


export default view(HeroComponent);