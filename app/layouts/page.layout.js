import "./header.component.scss";

import {Component}            from "react";
import {GetPage, Subject}     from "../../stores/data.store";
import {distinctUntilChanged} from "rxjs/operators/index";


class PageLayout extends Component {

    constructor(props) {
        super(props);

        // Subject.pipe(
        //     distinctUntilChanged((oldData, newData) => oldData.options === newData.options)
        // ).subscribe((data) => {
        //     console.log(`Page Subscriber ${slug}:`, data);
        //     setTimeout(() => this.setState({page: GetPage(slug)}));
        // });
    }

    render() {

        return (

            <div data-component="header">
                <div className="header">



                </div>
            </div>
        );
    }
}


export default HeaderComponent;