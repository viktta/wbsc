import { POST_USER_INFO } from '../Actions/actions';

const initialState = {
    user: {}
}

export function postUserInfo(state = initialState, action) {
    switch (action.type) {
        case POST_USER_INFO: {
            return {
                ...state,
            }
        }
        default:
            return state
    }
}