import "./page.screen.scss";

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


const ComponentElement = ({component, page}) => {
    // console.log("ComponentElement", component);

    const components = {
        HeroComponent            : <HeroComponent  {...component}/>,
        LatestPostsComponent     : <LatestComponent  {...component}/>,
        TagComponent             : <HashesComponent  {...component}/>,
        SelectedArticlesComponent: <PromosComponent  {...component}/>,
        RandomArticlesComponent  : <RandomsComponent  {...component}/>,
        FeatureComponent         : <FeatureComponent  {...component}/>,
        NewsletterComponent      : <NewsletterComponent  {...component}/>,
        VideoComponent           : <VideoComponent  {...component}/>,
        InstagramComponent       : <InstagramComponent  {...component}/>,
        ImageComponent           : <ImageComponent  {...component} isPage={true} page={page}/>,
        TextComponent            : <TextComponent  {...component} isPage={true} page={page}/>,
    };

    const backgroundColor = _.get(component, "options.backgroundColor");
    const topPadding      = _.get(component, "options.topPadding");
    const bottomPadding   = _.get(component, "options.bottomPadding");

    return (
        <div className={`section ${backgroundColor} `} data-top-padding={topPadding}
             data-bottom-padding={bottomPadding}>
            <div className="container">
                {components[component["acf_fc_layout"]]}
            </div>
        </div>
    );
};


class PageScreen extends Component {
    state = {
        page: this.props.page,
    };

    constructor(props) {
        super(props);

        console.info("PageScreen", {props, state: this.state});

        if (!this.state.page) {
            this.init();
        }
    };

    init = async () => {
        const pageSlug = _.get(this, "props.match.params.pageSlug") || "home";
        const {page}   = await GetPageBySlug(pageSlug);

        LiveStore.ChangePage();
        this.setState({page});
    };

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.init();
        }
    }

    render() {
        const page = this.state.page;

        let {date, summary, title, author, content, components, categories, tags, visibleTitle} = page || {};

        const path          = _.get(this.props, "location.pathname");
        const featuredImage = _.get(page, "featuredImage.url");
        components          = NormalizeComponents(components);
        categories          = categories || [];
        tags                = tags || [];

        return (
            <div data-screen="page" data-visible={LiveStore.isContentVisible}>
                <div className="page">

                    {visibleTitle && (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-1"/>
                                <div className="col-md-10">
                                    <div className="page-title" dangerouslySetInnerHTML={{__html: visibleTitle}}/>
                                </div>
                            </div>
                        </div>

                    )}

                    {components.map(component => ComponentElement({component, page}))}

                    {content && (
                        <div className={`section`}>
                            <div className="container">
                                <TextComponent text={content} isPage={true}/>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        );
    }
};


export default view(PageScreen);