import "./latest.component.scss";

import {store, view} from "react-easy-state";

import {Link}   from "react-router-dom";
import {Helmet} from "react-helmet";

import {Component, useState, useEffect, useReducer} from "react";

import SidebarReducer                                         from "reducers/sidebar.reducer";
import PageStore                                              from "../../stores/page.store";
import PostStore, {LoadLatestPosts, GetPosts, GetLatestPosts} from "../../stores/post.store";
import {GetPostImageStyle}                                    from "../../services/helper.service";


const Store = store({
    currentItem: 1,
});

const LatestComponent = () => {

    const posts = PostStore.latestPosts;

    const moveLeft = () => {
        Store.currentItem = --Store.currentItem < 0 ? 0 : Store.currentItem;
    };

    const moveRight = () => {
        // Store.currentItem++;
        Store.currentItem = ++Store.currentItem > posts.length - 1 ? posts.length - 1 : Store.currentItem;
    };

    const isLast = () => {
        return Store.currentItem === posts.length - 1;
    };

    const isFirst = () => {
        return Store.currentItem === 0;
    };

    const isCurrentItem = (item) => {
        return Store.currentItem === item;
    };

    return (
        <div data-component="latest">

            <div className="latest-other">
                <div className="latest-title">
                    Latest Articles
                </div>

                <div className="latest-left" onClick={moveLeft} data-inactive={isFirst()}>
                    <i className="far fa-arrow-left"/>
                </div>
                <div className="latest-right" onClick={moveRight} data-inactive={isLast()}>
                    <i className="far fa-arrow-right"/>
                </div>
            </div>


            <div className="latest" style={{left: -320 * Store.currentItem}}>

                {_.map(posts, (post, index) => (

                    <Link to={`/articles/${_.get(post, "slug")}`} className="latest-item" data-active={isCurrentItem(index)}>
                        <div className="item-image" style={GetPostImageStyle(post)}/>
                        <div className="item-overlay">
                            <div className="overlay-author">{_.get(post, `_embedded.author[0].name`)}</div>
                            <div className="overlay-title">{_.get(post, "title.rendered")}</div>
                            {/*<div className="overlay-stats">*/}
                            {/*<div className="overlay-stat">*/}
                            {/*<i className="fas fa-eye"/> 122*/}
                            {/*</div>*/}
                            {/*<div className="overlay-stat">*/}
                            {/*<i className="fas fa-heart" style={{color: "#f08d8e"}}/> 66*/}
                            {/*</div>*/}
                            {/*<div className="overlay-stat">*/}
                            {/*<i className="fas fa-comments-alt" style={{color: "#57c4ef"}}/> 7*/}
                            {/*</div>*/}
                            {/*</div>*/}
                        </div>
                    </Link>
                ))}

            </div>

        </div>
    );
};


export default view(LatestComponent);