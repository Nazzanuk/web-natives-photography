import "./nav.component.scss";

import {store, view}                                from "react-easy-state";
import {Component, useState, useEffect, useReducer} from "react";


const navComponent = () => {

    return (
        <div data-component="nav">
            <div className="nav">


            </div>
        </div>
    );
};


export default view(navComponent);