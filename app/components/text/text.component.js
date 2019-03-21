import "./text.component.scss";

import {store, view}                                from "react-easy-state";
import {Link}                                       from "react-router-dom";
import {Helmet}                                     from "react-helmet";
import {Component, useState, useEffect, useReducer} from "react";

import SidebarReducer from "reducers/sidebar.reducer";


const TextComponent = ({text, page, isPage}) => {

    const title = _.get(page, "title.rendered");

    return (
        <div data-component="text">

            {!isPage && (
                <div className="text" dangerouslySetInnerHTML={{__html: text}}/>
            )}

            {isPage && (

                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-10">
                        <div className="text-paper" dangerouslySetInnerHTML={{__html: text}}/>
                    </div>
                </div>
            )}

        </div>
    );
};


export default view(TextComponent);