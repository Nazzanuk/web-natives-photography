import "./project.screen.scss";

import {store, view}                                from "react-easy-state";
import {Link}                                       from "react-router-dom";
import {Helmet}                                     from "react-helmet";
import {Component} from "react";
import ReactGA                      from "react-ga";


import ReactDOM from "react-dom";

import Swipe from 'react-easy-swipe';


import PromosComponent from "components/promos/promos.component";

import LiveStore                              from "stores/live.store";
import PostStore                              from "stores/post.store";
import PageStore, {LoadPage}                  from "stores/page.store";
import NavStore, {GetRouteData, GetRouteSlug} from "stores/nav.store";
import GetProjectBySlug                       from "requests/get-project-by-slug.request";
import {Backgroundify, NormalizeComponents}   from "../../services/helper.service";
import GetSetBySlug                           from "../../requests/get-set-by-slug.request";


class ProjectScreen extends Component {
    state = {
        project     : this.props.project,
        set         : this.props.set,
        currentImage: 0
    };

    constructor(props) {
        super(props);

        ReactGA.pageview(window.location.pathname + window.location.search);
        console.log(window.location.pathname + window.location.search);
        this.$images = React.createRef();

        console.info("ProjectScreen", {props, state: this.state});

        if (!this.state.project || !this.state.set) {
            this.init();
        } else {
            LiveStore.ShowPage();
        }
    };

    init = async () => {
        LiveStore.HidePage();

        const {projectSlug, setSlug} = _.get(this, "props.match.params");

        const {project} = await GetProjectBySlug(projectSlug);
        const {set}     = await GetSetBySlug(setSlug);

        this.setState({project, set});
        LiveStore.ShowPage();

        console.log("{project, set}", {project, set})
    };

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.init();
        }
    }

    prevImage() {
        let currentImage = this.state.currentImage - 1;
        currentImage     = currentImage < 0 ? 0 : currentImage;
        this.setState({currentImage});
    }

    nextImage() {
        let max          = this.state.project.images.length - 1;
        let currentImage = this.state.currentImage + 1;
        currentImage     = currentImage >= max ? max : currentImage;
        this.setState({currentImage});
    }

    handleScroll() {
        // let timeout;
        //
        // return _.throttle((event) => {
        //     console.log('handleScroll', event);
        //
        //     if (event.deltaY > 0) {
        //         this.nextImage()
        //     }
        //     if (event.deltaY < 0) {
        //         this.prevImage()
        //     }
        //
        //
        //     ReactDOM.findDOMNode(this.$images.current).removeEventListener('wheel', this.handleScrollSingle);
        //     timeout = setTimeout(() => {
        //         // clearTimeout();//
        //         ReactDOM.findDOMNode(this.$images.current).addEventListener("wheel", this.handleScrollSingle);
        //     }, 1000)
        // }, 200)
    }

    // componentDidMount() {
    //     this.handleScrollSingle = this.handleScroll();
    //
    //     if (!process.browser) return;
    //     ReactDOM.findDOMNode(this.$images.current).addEventListener("wheel", this.handleScrollSingle);
    // }
    //
    // componentWillUnmount() {
    //     // console.log('this.$images', this.$images)
    //     // if (!process.browser || !this.$images) return;
    //     ReactDOM.findDOMNode(this.$images.current).removeEventListener('wheel', this.handleScrollSingle);
    // }

    render() {
        const set          = this.state.set;
        const project      = this.state.project;
        const currentImage = this.state.currentImage;

        if (!project || !set) return <div data-screen="project" data-visible={LiveStore.isContentVisible}/>;

        let {id, title, slug, summary, name, images} = project || {};

        images = images || [];


        const path = _.get(this.props, "location.pathname");

        return (
            <div data-screen="project" data-visible={LiveStore.isContentVisible} ref={this.$images}>
                <Helmet>
                    <title>{`${title}`} | Project | Web Natives Photography</title>
                </Helmet>

                {/*<div className="project-title" dangerouslyProjectInnerHTML={{__html: title}}/>*/}
                {/*<div className="project-summary" dangerouslyProjectInnerHTML={{__html: summary}}/>*/}

                <Swipe onSwipeRight={() => this.prevImage()}
                       onSwipeLeft={() => this.nextImage()}
                >
                    <div className="project-images">
                        <div className="image-prev" onClick={() => this.prevImage()}/>
                        <div className="image-next" onClick={() => this.nextImage()}/>

                        <div className="image-box-container" style={{marginLeft: `-${currentImage * 100}vw`}}>
                            {images.map(image =>
                                <div className="image-box">
                                    <div className="box-image" style={Backgroundify(image.url)}/>
                                </div>
                            )}
                        </div>

                    </div>
                </Swipe>

                <div className="project-info" ref="project-info">
                    <Link className="info-set" to={`/set/${_.get(set, "slug")}`}
                          dangerouslySetInnerHTML={{__html: _.get(set, "title")}}/>
                    <div className="info-title" dangerouslySetInnerHTML={{__html: title}}/>
                    <div className="info-title">{currentImage + 1} of {images.length}</div>

                </div>
            </div>
        );
    };
};


export default view(ProjectScreen);