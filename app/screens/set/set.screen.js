import "./set.screen.scss";

import {store, view} from "react-easy-state";
import {Link}        from "react-router-dom";
import {Helmet}      from "react-helmet";
import {Component}   from "react";
import ReactGA       from "react-ga";

import PromosComponent from "components/promos/promos.component";

import LiveStore                              from "stores/live.store";
import PostStore                              from "stores/post.store";
import PageStore, {LoadPage}                  from "stores/page.store";
import NavStore, {GetRouteData, GetRouteSlug} from "stores/nav.store";
import GetSetBySlug                           from "requests/get-set-by-slug.request";
import {Backgroundify, NormalizeComponents}   from "../../services/helper.service";


class SetScreen extends Component {
    state = {
        set: this.props.set,
    };

    constructor(props) {
        super(props);

        ReactGA.pageview(window.location.pathname + window.location.search);
        console.log(window.location.pathname + window.location.search);

        console.info("SetScreen", {props, state: this.state});

        if (!this.state.set) {
            this.init();
        } else {
            LiveStore.ShowPage();
        }
    };

    init = async () => {
        LiveStore.HidePage();

        const setSlug = _.get(this, "props.match.params.setSlug") || "home";

        const {set} = await GetSetBySlug(setSlug);

        this.setState({set});
        LiveStore.ShowPage();

        console.log("set", set);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.init();
        }
    }

    render() {
        const set = this.state.set;

        if (!set) return <div data-screen="set" data-visible={LiveStore.isContentVisible}/>;

        let {id, title, summary, slug, name, projects} = set || {};


        const path = _.get(this.props, "location.pathname");

        return (
            <div data-screen="set" data-visible={LiveStore.isContentVisible}>
                <Helmet>
                    <title>{`${title}`} | Web Natives Photography</title>
                </Helmet>

                <div className="set-title" dangerouslySetInnerHTML={{__html: title}}/>
                <div className="set-summary" dangerouslySetInnerHTML={{__html: summary}}/>

                <div className="set-projects">
                    {projects.map(project =>
                        <Link className="project" to={`/project/${slug}/${project.slug}`}>
                            <div className="project-image" style={Backgroundify(project.images[0].url)}/>
                            <div className="project-title" dangerouslySetInnerHTML={{__html: project.title}}/>
                        </Link>,
                    )}

                </div>
            </div>
        );
    };
};


export default view(SetScreen);