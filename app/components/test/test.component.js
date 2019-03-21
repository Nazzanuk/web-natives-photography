// import "./header.component.scss";

import {Component, useState, useEffect, useReducer} from "react";

import {GetPage, Subject}     from "../../stores/data.store";
import {distinctUntilChanged} from "rxjs/operators/index";
import SidebarReducer         from "reducers/sidebar.reducer";

const TestComponent = () => {

    // const [SidebarState, SidebarDispatch] = SidebarReducer();

    return (
        <div>
            {/*{String(SidebarState.active)}*/}
        </div>
    );
};


export default TestComponent;