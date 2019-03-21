import "./quote.component.scss";

import {store, view}                                from "react-easy-state";
import {Link}                                       from "react-router-dom";
import {Helmet}                                     from "react-helmet";
import {Component, useState, useEffect, useReducer} from "react";

import SidebarReducer         from "reducers/sidebar.reducer";


const QuoteComponent = ({quote, author}) => {

    return (
        <div data-component="quote">
            <div className="quote" >
                <i className="fas fa-quote-left"/>
                {/*<i className="fas fa-quote-right"/>*/}

                <div dangerouslySetInnerHTML={{__html: quote}}/>

                {author && (
                    <div className="quote-author" dangerouslySetInnerHTML={{__html: author}}/>
                )}
            </div>
        </div>
    );
};


export default view(QuoteComponent);