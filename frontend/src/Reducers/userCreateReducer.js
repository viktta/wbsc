import { GET_USER_INFO } from '../Actions/actions';

const initialState = {
    user: {
        email : '',
        username: '',
        password: ''
    }
}

export function postUserInfo(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO: {
            return {
                ...state,
            }
        }
        default:
            return state
    }
}