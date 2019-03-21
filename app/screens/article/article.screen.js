import "./article.screen.scss";

import {store, view} from "react-easy-state";
// import {BrowserRouter, StaticRouter, Route}       from "react-router-dom";

import {Helmet}                                     from "react-helmet";
import {Component, useState, useEffect, useReducer} from "react";
import moment                                       from "moment";
import {Link}                                       from "react-router-dom";

import FeatureComponent    from "components/feature/feature.component";
import ImageComponent      from "components/image/image.component";
import TextComponent       from "components/text/text.component";
import QuoteComponent      from "components/quote/quote.component";
import PromosComponent     from "components/promos/promos.component";
import RandomsComponent    from "components/randoms/randoms.component";
import NewsletterComponent from "components/newsletter/newsletter.component";

import LiveStore                                                                from "stores/live.store";
import {Backgroundify, GetPostImageStyle, GetPostImageUrl, NormalizeComponents} from "services/helper.service";
import GetArticleBySlug                                                         from "requests/get-article-by-slug.request";


const ComponentElement = ({component, index}) => {

    const components = {
        ImageComponent: <ImageComponent  {...component} key={index}/>,
        TextComponent : <TextComponent  {...component} key={index}/>,
        QuoteComponent: <QuoteComponent  {...component} key={index}/>,
    };

    return components[component.acf_fc_layout];
};


class ArticleScreen extends Component {
    state = {
        article: this.props.article,
    };

    constructor(props) {
        super(props);

        console.info("ArticleScreen", {props, state: this.state});

        if (!this.state.article) {
            this.init();
        } else {
            LiveStore.ShowPage();
        }
    };

    init = async () => {
        LiveStore.HidePage();
        const articleSlug = _.get(this, "props.match.params.articleSlug");
        const {article}   = await GetArticleBySlug(articleSlug);

        this.setState({article});
        LiveStore.ShowPage();
    };

    render() {
        const article = this.state.article;

        let {date, summary, title, author, content, components, categories, tags} = article || {};

        const path          = _.get(this.props, "location.pathname");
        const featuredImage = _.get(article, "featuredImage.url");
        components          = NormalizeComponents(components);
        categories          = categories || [];
        tags                = tags || [];

        // console.log("ArticleScreen render", article);
        // console.log("ArticleScreen components", components);

        return (
            <div data-screen="article" data-visible={LiveStore.isContentVisible}>
                <Helmet>
                    <title>{title}</title>

                    <meta property="og:url" content={`https://platformonline.uk/${path}`}/>
                    <meta property="og:type" content="article"/>
                    <meta property="og:title" content={title}/>
                    <meta property="og:description" content={summary}/>
                    <meta property="og:image" content={featuredImage}/>
                    <meta property="og:url" content={`https://platformonline.uk${path}`}/>
                    <meta name="twitter:card" content="summary"/>
                    <meta name="twitter:site" content="@YourPlatformUK"/>
                </Helmet>

                <div className="article">

                    <div className="section section">
                        <div className="container">
                            <div className="article-hero">
                                <div className="hero-image" style={Backgroundify(featuredImage)}/>
                                <div className="hero-overlay">
                                    <div className="hero-title" dangerouslySetInnerHTML={{__html: title}}/>
                                </div>
                                <Link className="hero-author" to={`/author/${_.get(author, "slug")}`}>
                                    {_.get(author, "name")}
                                </Link>

                            </div>

                            <div className="row">
                                <div className="col-xl-9">


                                    {Boolean(tags.length) && (
                                        <div className="article-cats">
                                            {tags.map(tag => (
                                                <Link to={`/tag/${tag.slug}`} className="article-cat" key={tag.slug}>
                                                    #{tag.slug}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="col-xl-9">

                                    <div className="article-content">

                                        <div className="article-date">
                                            <div className="date-item">{moment(date).format("ddd Do MMM YYYY")}</div>

                                            {Boolean(categories.length) && categories.map(category => (
                                                <Link href={`/category/${category.slug}`} className="date-item"
                                                      key={category.slug}>
                                                    {category.slug}
                                                </Link>
                                            ))}
                                        </div>


                                        {summary && (
                                            <div className="article-summary"
                                                 dangerouslySetInnerHTML={{__html: summary}}/>
                                        )}

                                        <div className="article-share">
                                            {/*<i className="share-item fal fa-heart" title={"Like this article"}*/}
                                            {/*style={{marginBottom: 30}}/>*/}
                                            <a
                                                href={`https://www.facebook.com/sharer.php?u=https://platformonline.uk${path}`}
                                                className="share-item fab fa-facebook-f"
                                                style={{backgroundColor: "#3b5998"}} target="_blank"
                                            />

                                            <a href="whatsapp://send"
                                                  className="share-item fab fa-whatsapp visible-mobile"
                                                  data-text={title}
                                                  style={{backgroundColor: "#128c7e"}}
                                            />

                                            <a
                                                href={`https://reddit.com/submit?url=https://platformonline.uk${path}&title=${title}`}
                                                className="share-item fab fa-reddit-alien"
                                                style={{backgroundColor: "#ff4500"}} target="_blank"
                                            />

                                            <a
                                                href={`https://twitter.com/intent/tweet?url=https://platformonline.uk${path}&text=${title}&via=YourPlatformUK&hashtags=${tags.map(tag => tag.slug).join(",")}`}
                                                className="share-item fab fa-twitter"
                                                style={{backgroundColor: "#1da1f2"}} target="_blank"
                                            />

                                            <a
                                                href={`http://pinterest.com/pin/create/link/?url=https://platformonline.uk${path}`}
                                                className="share-item fab fa-pinterest"
                                                style={{backgroundColor: "#bd091a"}} target="_blank"
                                            />

                                            <a
                                                href={`mailto:?subject=${title}&body=https://platformonline.uk${path}`}
                                                className="share-item fal fa-envelope"
                                                style={{backgroundColor: "#323232"}}
                                            />
                                        </div>

                                        <div dangerouslySetInnerHTML={{__html: content}}/>
                                        {/*<QuoteComponent/>*/}

                                        {components.map((component, index) => ComponentElement({component, index}))}
                                    </div>

                                    {/*<div className="article-comments" key={article.id} dangerouslySetInnerHTML={{__html: Disqus}}>*/}

                                    {/*</div>*/}
                                </div>

                                <div className="col-xl-3">
                                    <div className="gap"/>


                                    <div className="gap"/>
                                    <div className="small-label">More from us</div>
                                    <RandomsComponent maxArticles={2}/>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9">
                                <div className="article-share-bottom">
                                    <div className="share-title">
                                        Share the <i className="fas fa-heart"/>
                                    </div>

                                    <div className="share-text">
                                        If you enjoyed this post!
                                    </div>

                                    <div className="share-buttons">


                                        {/*<i className="share-item fas fa-heart" title={"Like this article"} style={{marginBottom: 30, backgroundColor: "#855c9f"}}/>*/}

                                        <a href={`https://www.facebook.com/sharer.php?u=https://platformonline.uk${path}`}
                                           className="share-item fab fa-facebook-f"
                                           style={{backgroundColor: "#3b5998"}} target="_blank"
                                        />

                                        <a href="whatsapp://send"
                                           className="share-item fab fa-whatsapp visible-mobile"
                                           data-text={title}
                                           style={{backgroundColor: "#128c7e"}}
                                        />

                                        <a href={`https://reddit.com/submit?url=https://platformonline.uk${path}&title=${title}`}
                                           className="share-item fab fa-reddit-alien"
                                           style={{backgroundColor: "#ff4500"}} target="_blank"
                                        />

                                        <a href={`https://twitter.com/intent/tweet?url=https://platformonline.uk${path}&text=${title}&via=YourPlatformUK&hashtags=${tags.map(tag => tag.slug).join(",")}`}
                                           className="share-item fab fa-twitter"
                                           style={{backgroundColor: "#1da1f2"}} target="_blank"
                                        />

                                        <a href={`http://pinterest.com/pin/create/link/?url=https://platformonline.uk${path}`}
                                           className="share-item fab fa-pinterest"
                                           style={{backgroundColor: "#bd091a"}} target="_blank"
                                        />

                                        <a href={`mailto:?subject=${title}&body=https://platformonline.uk${path}`}
                                           className="share-item fal fa-envelope"
                                           style={{backgroundColor: "#323232"}} target="_blank"
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>


                    {/*<div className="section section-alt">*/}
                    {/*<div className="container">*/}
                    {/*<NewsletterComponent title="Sign up for more articles!"/>*/}
                    {/*</div>*/}
                    {/*</div>*/}

                    <div className="section section-alt section">
                        <div className="container">
                            <RandomsComponent maxArticles={6} label={"You may have missed"}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}


export default view(ArticleScreen);