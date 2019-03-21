import {useState, useEffect, useReducer} from "react";

import DataStore, {Subject, GetPage} from "stores/data.store";
import {distinctUntilChanged}        from "rxjs/operators/index";

const useRx = () => {
    const [state, setState] = useState(false);

    Subject.subscribe((data) => setTimeout(() => setState(data)));

    return state;
};