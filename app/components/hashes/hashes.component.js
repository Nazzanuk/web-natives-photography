import "./hashes.component.scss";

import {store, view} from "react-easy-state";

import {Link}                                       from "react-router-dom";
import {Helmet}                                     from "react-helmet";
import {Component, useState, useEffect, useReducer} from "react";

import SidebarReducer              from "reducers/sidebar.reducer";
import PostStore, {LoadPostsByTag} from "../../stores/post.store";

import {GetPostImageStyle} from "services/helper.service";


const HashesComponent = ({tag}) => {

    LoadPostsByTag(tag.slug);

    const posts = _.take(PostStore.GetPostsByTag(tag.slug), 8);

    return (
        <div data-component="hashes">
            <div className="hash-tag">
                <i className="fal fa-hashtag"/> {tag.name}
            </div>

            <div className="hash-stories">
                {_.map(posts, (post, index) => (
                    <Link to={`/articles/${_.get(post, "slug")}`} key={post.slug} className="hash">
                        <div className="item-image" style={GetPostImageStyle(post)}/>
                        <div className="item-overlay">
                            <div className="overlay-author">{_.get(post, `_embedded.author[0].name`)}</div>
                            <div className="overlay-title"
                                 dangerouslySetInnerHTML={{__html: _.get(post, "title.rendered")}}/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};


export default view(HashesComponent);