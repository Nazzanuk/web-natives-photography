import "./tag.screen.scss";

import {store, view}                                from "react-easy-state";
import {Link}                                       from "react-router-dom";
import {Helmet}                                     from "react-helmet";
import {Component, useState, useEffect, useReducer} from "react";

import PromosComponent from "components/promos/promos.component";

import LiveStore                              from "stores/live.store";
import PostStore                              from "stores/post.store";
import PageStore, {LoadPage}                  from "stores/page.store";
import NavStore, {GetRouteData, GetRouteSlug} from "stores/nav.store";


const TagScreen = () => {
    const posts = GetRouteData();

    const tag = NavStore.slug;
    console.log("TagScreen posts", posts);

    return (
        <div data-screen="tag" data-visible={LiveStore.isContentVisible}>

            <Helmet>
                <title>#{tag.toUpperCase()} | The Platform</title>
            </Helmet>

            <div className="tag">

                <div className={`section section-alt`}>
                    <div className="container">
                        <div className="section-label">
                            #<span dangerouslySetInnerHTML={{__html: tag}}/>
                        </div>

                        <PromosComponent articles={posts} isFormatted={true}/>
                    </div>
                </div>

            </div>
        </div>
    );
};


export default view(TagScreen);