import "./category.screen.scss";

import {store, view}                                from "react-easy-state";
import {Link}                                       from "react-router-dom";
import {Helmet}                                     from "react-helmet";
import {Component, useState, useEffect, useReducer} from "react";

import PromosComponent from "components/promos/promos.component";

import LiveStore                              from "stores/live.store";
import PostStore                              from "stores/post.store";
import PageStore, {LoadPage}                  from "stores/page.store";
import NavStore, {GetRouteData, GetRouteSlug} from "stores/nav.store";
import GetArticlesByCategorySlug              from "requests/get-articles-by-category-slug.request";
import GetCategoryBySlug                      from "requests/get-category-by-slug.request";
import {NormalizeComponents}                  from "../../services/helper.service";


class CategoryScreen extends Component {
    state = {
        category: this.props.category,
        articles: this.props.articles,
    };

    constructor(props) {
        super(props);

        console.info("CategoryScreen", {props, state: this.state});

        if (!this.state.category && !this.state.articles) {
            this.init();
        } else {
            LiveStore.ShowPage();
        }
    };

    init = async () => {
        LiveStore.HidePage();

        const categorySlug = _.get(this, "props.match.params.categorySlug") || "home";

        const {posts: articles} = await GetArticlesByCategorySlug(categorySlug);
        const {category}        = await GetCategoryBySlug(categorySlug);

        this.setState({category, articles});
        LiveStore.ShowPage();

        console.log("{category, articles}", {category, articles})
    };

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.init();
        }
    }

    render() {
        const category = this.state.category;
        const articles = this.state.articles;

        let {id, count, description, slug, name} = category || {};

        const path = _.get(this.props, "location.pathname");

        return (
            <div data-screen="category" data-visible={LiveStore.isContentVisible}>
                <Helmet>
                    <title>{`${name}`} | The Platform UK</title>
                </Helmet>

                {/*<div className="category">*/}
                    <div className={`section`}>
                        <div className="container">
                            <div className="section-label">
                                <span dangerouslySetInnerHTML={{__html: name}}/>
                            </div>

                            {articles && (
                                <PromosComponent articles={articles} isFormatted={true}/>
                            )}

                        </div>
                    </div>
                {/*</div>*/}


            </div>
        );
    };
};


export default view(CategoryScreen);