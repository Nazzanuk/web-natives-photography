import "./video.component.scss";

import {store, view} from "react-easy-state";

import {Link}                                       from "react-router-dom";
import {Helmet}                                     from "react-helmet";
import {Component, useState, useEffect, useReducer} from "react";

import SidebarReducer                          from "reducers/sidebar.reducer";
import {GetPostsByObjects, LoadPostsByObjects} from "../../stores/post.store";
import NavStore                                from "../../stores/nav.store";
import PostStore                               from "../../stores/post.store";


class VideoComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {videoId, componentTitle, title, text, link} = this.props;

        videoId = videoId || "9OB72GZOS4c";

        return (
            <div data-component="video">
                {componentTitle && (
                    <div className="section-label" dangerouslySetInnerHTML={{__html: componentTitle}}/>
                )}

                <div className="video-order">
                    <div className="video-box">

                        <div className="video">

                            <iframe src={`//www.youtube.com/embed/${videoId}?controls=1&rel=0&showinfo=0&modestbranding=0`} className="yt-video-embed" allowFullScreen="1" frameBorder="0"/>

                        </div>
                    </div>

                    {(title || text) && (
                        <div className="video-caption">
                            {title && (
                                <div className="caption-title" dangerouslySetInnerHTML={{__html: title}}/>
                            )}

                            {text && (
                                <div className="caption-description" dangerouslySetInnerHTML={{__html: text}}/>
                            )}

                            {_.get(link, "url") && (
                                <Link to={link.url} className="caption-link">
                                    More &nbsp; <i className="fal fa-chevron-right"/>
                                </Link>
                            )}

                        </div>
                    )}
                </div>
            </div>
        );
    }
}


export default view(VideoComponent);