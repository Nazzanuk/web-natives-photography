import "./feature.component.scss";

import {store, view}                                from "react-easy-state";
import {Component, useState, useEffect, useReducer} from "react";
import {Link}                                       from "react-router-dom";

import SidebarReducer                          from "reducers/sidebar.reducer";
import {GetPostsByObjects, LoadPostsByObjects} from "../../stores/post.store";
import {GetPostImageStyle}                     from "../../services/helper.service";


const FeatureComponent = ({article}) => {

    LoadPostsByObjects(article);

    const Article = GetPostsByObjects(article)[0];

    return (
        <div data-component="feature">
            <Link to={`/articles/${_.get(Article, "slug")}`} className="feature">
                <div className="item-overlay">
                    <div className="overlay-author" dangerouslySetInnerHTML={{__html: _.get(Article, `_embedded.author[0].name`)}}/>
                    <div className="overlay-title" dangerouslySetInnerHTML={{__html: _.get(Article, "title.rendered")}}/>
                    <div className="overlay-stats">
                        {/*<div className="overlay-stat">*/}
                        {/*<i className="fas fa-eye"/> 122*/}
                        {/*</div>*/}
                        {/*<div className="overlay-stat">*/}
                        {/*<i className="fas fa-heart" style={{color: "#f08d8e"}}/> 66*/}
                        {/*</div>*/}
                        {/*<div className="overlay-stat">*/}
                        {/*<i className="fas fa-comments-alt" style={{color: "#57c4ef"}}/> 7*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="item-image" style={GetPostImageStyle(Article)}/>
            </Link>
        </div>
    );
};


export default view(FeatureComponent);