import {store, view} from "react-easy-state";

import LiveStore from "stores/live.store";

import "./loader.component.scss";

const LoaderComponent = () => {

    return (
        <div data-component="loader" data-visible={!LiveStore.isContentVisible}>
            <i className="fal fa-spinner-third fa-spin"/>
        </div>
    );
};


export default view(LoaderComponent);