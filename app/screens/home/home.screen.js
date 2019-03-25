import "./home.screen.scss";

import {store, view}                                from "react-easy-state";
import {Link}                                       from "react-router-dom";
import {Component, useState, useEffect, useReducer} from "react";

import FeatureComponent    from "components/feature/feature.component";
import ImageComponent      from "components/image/image.component";
import TextComponent       from "components/text/text.component";
import HeroComponent       from "components/hero/hero.component";
import HashesComponent     from "components/hashes/hashes.component";
import PromosComponent     from "components/promos/promos.component";
import RandomsComponent    from "components/randoms/randoms.component";
import LatestComponent     from "components/latest/latest.component";
import InstagramComponent  from "components/instagram/instagram.component";
import NewsletterComponent from "components/newsletter/newsletter.component";
import VideoComponent      from "components/video/video.component";

import LiveStore                from "stores/live.store";

import GetPageBySlug            from "requests/get-page-by-slug.request";
import {NormalizeComponents}    from "services/helper.service";


class HomeScreen extends Component {
    state = {
        page: this.props.page,
    };

    constructor(props) {
        super(props);

        LiveStore.ChangePage();
        console.info("HomeScreen", {props, state: this.state});
        //
        // if (!this.state.page) {
        //     this.init();
        // }
    };

    // init = async () => {
    //     const pageSlug = _.get(this, "props.match.params.pageSlug") || "home";
    //     const {home}   = await GetPageBySlug(pageSlug);
    //
    //     LiveStore.ChangePage();
    //     this.setState({page});
    // };

    componentDidUpdate(prevProps) {
        // if (prevProps.location.pathname !== this.props.location.pathname) {
        //     this.init();
        // }
    }

    render() {
        // const page = this.state.page;
        //
        // let {date, summary, title, author, content, components, categories, tags, visibleTitle} = page || {};
        //
        // const path          = _.get(this.props, "location.pathname");
        // const featuredImage = _.get(page, "featuredImage.url");
        // components          = NormalizeComponents(components);
        // categories          = categories || [];
        // tags                = tags || [];

        return (
            <div data-screen="home" data-visible={LiveStore.isContentVisible}>
                    <div className="home-sets">
                        <Link className="set" to={`/set/architecture`}>Architecture</Link>
                        <Link className="set" to={`/set/interiors`}>Interiors</Link>
                        <Link className="set" to={`/set/editorial`}>Editorial</Link>
                        <Link className="set" to={`/set/landscapes`}>Landscapes</Link>
                        {/*<Link className="set" to={`/set/creative`}>Creative</Link>*/}
                        {/*<Link className="set" to={`/set/portraits`}>Portraits</Link>*/}
                        {/*<Link className="set" to={`/set/events`}>Events</Link>*/}
                    </div>
            </div>
        );
    }
};


export default view(HomeScreen);