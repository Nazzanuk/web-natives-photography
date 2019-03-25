import "babel-polyfill";
import {store, view} from "react-easy-state";

import react, {Component}           from "react";
import ReactDOM                     from "react-dom";
import {BrowserRouter, Route, Link} from "react-router-dom";
import {Helmet}                     from "react-helmet";


import {API}     from "constants/config.constants";
// import DataStore, {Subject, GetPage} from "stores/data.store";
import LiveStore from "stores/live.store";

import HeaderComponent          from "components/header/header.component";
import FooterComponent          from "components/footer/footer.component";
import SidebarComponent         from "components/sidebar/sidebar.component";
import NewsletterPopupComponent from "components/newsletter-popup/newsletter-popup.component";
import LoaderComponent          from "components/loader/loader.component";


import HomeScreen     from "screens/home/home.screen";
import ArticleScreen  from "screens/article/article.screen";
import PageScreen     from "screens/page/page.screen";
import CategoryScreen from "screens/category/category.screen";
import SetScreen      from "screens/set/set.screen";
import ProjectScreen  from "screens/project/project.screen";
import TagScreen      from "screens/tag/tag.screen";
import AuthorScreen   from "screens/author/author.screen";

import "global/app.scss";


class App extends Component {

    constructor(props) {
        super(props);

        LiveStore.ChangePage();
        console.warn("props", props);
    }

    render() {
        return (
            <div data-page="page">
                <Helmet>
                    <title>Web Natives Photography</title>
                </Helmet>
                <HeaderComponent/>
                <LoaderComponent/>


                <div className="app-screens">
                    <Route exact path="/" component={HomeScreen}/>
                    <Route exact path="/:pageSlug" component={(props) => <PageScreen {...props} {...this.props}/>}/>
                    <Route exact path="/set/:setSlug"
                           component={(props) => <SetScreen {...props} {...this.props}/>}/>
                    <Route exact path="/project/:setSlug/:projectSlug"
                           component={(props) => <ProjectScreen {...props} {...this.props}/>}/>
                    {/*<Route exact path="/project/:projectSlug"*/}
                           {/*component={(props) => <ProjectScreen {...props} {...this.props}/>}/>*/}
                    {/*<Route exact path="/articles/:articleSlug" component={ArticleScreen}/>*/}
                    <Route exact path="/articles/:articleSlug"
                           component={(props) => <ArticleScreen {...props} {...this.props}/>}/>
                </div>
            </div>
        );
    }
}


if (process.browser) {
    console.log("ReactDOM.hydrate");
    ReactDOM.hydrate(<BrowserRouter><App/></BrowserRouter>, document.getElementById("app"));
}

export default App;