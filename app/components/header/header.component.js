import "./header.component.scss";

import {store, view}                                from "react-easy-state";
import {Component, useState, useEffect, useReducer} from "react";
import {Link}                                       from "react-router-dom";



function HeaderComponent() {

    return (
        <div data-component="header">
            <div className="header">

                <Link className="header-logo" to="/">
                    Web Natives Photography
                </Link>

            </div>
        </div>
    );
}


export default view(HeaderComponent);