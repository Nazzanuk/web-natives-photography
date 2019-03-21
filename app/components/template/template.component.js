import "./template.component.scss";

import {Component} from "react";


class TemplateComponent extends Component {

    constructor(props) {
        super(props);

        // console.log("TemplateComponent", props);
    }

    render() {
        const index          = _.get(this.props, "index");
        const title          = _.get(this.props, "title");
        const summary        = _.get(this.props, "summary");
        const componentLabel = _.get(this.props, "componentLabel");

        return (

            <div data-component="template" data-scroller={index} data-component-label={componentLabel}>
                <div className="template">
                    <div className="container">

                        {title && (
                            <div className="template-title" dangerouslySetInnerHTML={{__html: title}}/>
                        )}

                        {summary && (
                            <div className="template-summary" dangerouslySetInnerHTML={{__html: summary}}/>
                        )}

                    </div>
                </div>
            </div>
        );
    }
}


export default TemplateComponent;