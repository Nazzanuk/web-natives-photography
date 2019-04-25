import "./header.component.scss";

import {store, view}                                from "react-easy-state";
import {Component, useState, useEffect, useReducer} from "react";
import {Link}                                       from "react-router-dom";



function HeaderComponent() {

    return (
        <div data-component="header">
                <Link className="header-logo" to="/">
                    Web Natives Photography
                </Link>

                <a className="header-menu" href="mailto:info@webnatives.uk">
                    info@webnatives.photography

                </a>
        </div>
    );
}


export default view(HeaderComponent);