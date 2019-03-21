import "./promos.component.scss";

import {store, view}                                           from "react-easy-state";
import {Link}                                                  from "react-router-dom";
import {Helmet}                                                from "react-helmet";
import {Component, useState, useEffect, useReducer}            from "react";
import {GetPostsByObjects, LoadPostsByObjects, GetRandomPosts} from "../../stores/post.store";
import {Backgroundify, GetPostImageStyle}                      from "services/helper.service";


const PromosComponent = ({articles, label, isFormatted = false}) => {

    let Articles = articles;

    // if (!isFormatted) {
    //     LoadPostsByObjects(articles);
    //
    //     Articles = GetPostsByObjects(articles);
    // }

    console.log("Articles", Articles);

    return (
        <>
            {label && (
                <div className="section-label" dangerouslySetInnerHTML={{__html: label}}/>
            )}

            <div data-component="promos">
                {Articles.map((article, index) => (
                    <Link to={`/articles/${_.get(article, "slug")}`} className="promo" key={Articles[index].slug}>

                        <div className="item-image" style={Backgroundify(article.featuredImage.url)}/>
                        <div className="item-overlay">
                            <div className="overlay-author" dangerouslySetInnerHTML={{__html: article.author.name}}/>
                            <div className="overlay-title" dangerouslySetInnerHTML={{__html: article.title}}/>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};


export default view(PromosComponent);