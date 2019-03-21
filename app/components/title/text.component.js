import "./title.component.scss";

import {store, view}                                from "react-easy-state";
import {Component, useState, useEffect, useReducer} from "react";

import SidebarReducer from "reducers/sidebar.reducer";


const TitleComponent = ({title, page, isPage}) => {

    const title = _.get(page, "title.rendered");

    return (
        <div data-component="title">

            {!isPage && (
                <div className="title" dangerouslySetInnerHTML={{__html: title}}/>
            )}

            {isPage && (

                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-10">
                        <div className="title-paper" dangerouslySetInnerHTML={{__html: title}}/>
                    </div>
                </div>
            )}

        </div>
    );
};


export default view(TitleComponent);