import "./instagram.component.scss";

import {store, view}                                from "react-easy-state";
import {Component, useState, useEffect, useReducer} from "react";

import SidebarReducer from "reducers/sidebar.reducer";
import {BASE}         from "constants/config.constants";


const Store = store({
    media  : [],
    profile  : {},
});

const mediaRequest = async () => {
    let res = await fetch(`${BASE}/api/instagram`);

    let json = await res.json();

    if (json.data) {
        Store.media = _.take(json.data, 6);
    }

    res = await fetch(`${BASE}/api/instagram/profile`);

    json = await res.json();

    if (json.data) {
        Store.profile = json.data;
    }
};

const InstagramComponent = ({title}) => {

    return <><div/></>;

    return (
        <div data-component="instagram">

            <div className="section-label" dangerouslySetInnerHTML={{__html: title}}/>

            <div className="instagram">
                <div className="item-overlay">
                    <div className="overlay-background" style={{backgroundImage: `url("https://source.unsplash.com/random/2000x1020?landscape&i=123")`}}/>
                    <div className="overlay-profile" style={{backgroundImage: `url("${Store.profile.profile_picture}")`}}/>

                    <div className="overlay-name">@{Store.profile.username}</div>
                    <div className="overlay-real-name">{Store.profile.full_name}</div>
                    <div className="overlay-text">{Store.profile.bio}</div>
                    <Link href={`https://www.instagram.com/${Store.profile.username}/`}>
                        <a className="overlay-button"  target={"_blank"}>Follow</a>
                    </Link>
                </div>

                {/*<div className="instagram-images-box">*/}
                    <div className="instagram-images">
                        {Store.media.map((media, index) => (
                            <Link href={media.link} key={index}>
                                <a className="instagram-image"  target={"_blank"} style={{backgroundImage: `url("${media.images.standard_resolution.url}")`}}/>
                            </Link>
                        ))}
                        {/*<div className="instagram-image"  style={{backgroundImage: `url("https://source.unsplash.com/random/2001x1020?argument&i=123")`}}></div>?*/}
                    </div>

                {/*</div>*/}
                {/*<div className="item-image" style={{backgroundImage: `url("https://source.unsplash.com/random/2000x1020?faces&i=123")`}}/>*/}
            </div>
        </div>
    );
};

// mediaRequest();

export default view(InstagramComponent);