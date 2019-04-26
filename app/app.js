import "babel-polyfill";
import {store, view} from "react-easy-state";

import react, {Component}           from "react";
import ReactDOM                     from "react-dom";
import {BrowserRouter, Route, Link} from "react-router-dom";
import {Helmet}                     from "react-helmet";
import ReactGA                      from "react-ga";


import LiveStore from "stores/live.store";

import HeaderComponent from "components/header/header.component";
import LoaderComponent from "components/loader/loader.component";


import HomeScreen    from "screens/home/home.screen";
import ArticleScreen from "screens/article/article.screen";
import PageScreen    from "screens/page/page.screen";
import SetScreen     from "screens/set/set.screen";
import ProjectScreen from "screens/project/project.screen";

import "global/app.scss";


class App extends Component {

    constructor(props) {
        super(props);

        ReactGA.initialize("UA-139140846-1");

        LiveStore.ChangePage();
        console.warn("props", props);
    }

    render() {
        return (
            <div data-page="page">
                <Helmet>
                    <title>Web Natives Photography | Corporate Photographers</title>
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