import {SHOW_LOADER, HIDE_LOADER, NOT_AUTH} from "../actions/actionTypes";

const initialState = {
    loading: false,
    notAuth: false,
    isMessage: false,
}

export const loadReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOT_AUTH:
            return {...state, notAuth: true}
        case SHOW_LOADER:
            return {...state, loading: true}
        case HIDE_LOADER:
            return {...state, loading: false}
        default:
            return state
    }
}