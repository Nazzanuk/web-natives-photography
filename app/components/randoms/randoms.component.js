import "./randoms.component.scss";

import {store, view}                                           from "react-easy-state";
import {Link}                                                  from "react-router-dom";
import {Helmet}                                                from "react-helmet";
import {Component, useState, useEffect, useReducer}            from "react";
import {GetPostsByObjects, LoadPostsByObjects, GetRandomPosts} from "../../stores/post.store";
import {GetPostImageStyle}                                     from "../../services/helper.service";


const RandomsComponent = ({maxArticles, label}) => {

    const Articles = GetRandomPosts(maxArticles);

    return (
        <>
            {label && (
                <div className="section-label" dangerouslySetInnerHTML={{__html: label}}/>
            )}

            <div data-component="randoms">
                {Articles.map((article, index) => (
                    <Link to={`/articles/${_.get(article, "slug")}`} key={Articles[index].slug} className="random" key={Articles[index].slug}>

                        <div className="item-image" style={GetPostImageStyle(article)}/>
                        <div className="item-overlay">
                            <div className="overlay-author" dangerouslySetInnerHTML={{__html: _.get(article, `_embedded.author[0].name`)}}/>
                            <div className="overlay-title" dangerouslySetInnerHTML={{__html: _.get(article, "title.rendered")}}/>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};


export default view(RandomsComponent);