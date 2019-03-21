import {useState, useEffect, useReducer} from "react";


const initialState = {
    active: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "hide":
            return {active: false};
        case "show":
            return {active: true};
        case "toggle":
            return {active: !state.active};
    }

    return initialState;
};

const SidebarReducer = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return [state, dispatch];
};

export default SidebarReducer;