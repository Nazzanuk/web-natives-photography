import "./image.component.scss";

import {store, view}                                from "react-easy-state";
import {Link}                 from "react-router-dom";
import {Component, useState, useEffect, useReducer} from "react";

import SidebarReducer from "reducers/sidebar.reducer";


const ImageComponent = ({image, caption, isPage}) => {

    const url = _.get(image, "url");

    return (
        <div data-component="image">
            {!isPage && (
                <div className="image-box">
                    <div className="image">
                        {caption && (
                            <div className="image-caption" dangerouslySetInnerHTML={{__html: caption}}/>
                        )}

                        <img src={url} alt={caption}/>

                    </div>
                </div>
            )}


            {isPage && (

                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-10">
                        <div className="normal-image-box">
                            <div className="image">
                                {caption && (
                                    <div className="image-caption" dangerouslySetInnerHTML={{__html: caption}}/>
                                )}

                                <div className="image-element" style={{backgroundImage:`url("${url}")`}}>

                                </div>
                                {/*<img src={url} alt={caption}/>*/}

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default view(ImageComponent);