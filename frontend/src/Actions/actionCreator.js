import { POST_USER_INFO } from './actions';
import axios from 'axios';

export function requestPostUserInfo(username, email, password) {
    return {
        type: POST_USER_INFO,
        user: {
            username,
            email,
            password
        }
    }
}


export function postUserInfo(username, email, password) {
    return function (dispatch) {
        dispatch(requestPostUserInfo(username, email, password))
        return axios.post('http://127.0.0.1:8000/api/user/create/', {
            username,
            email,
            password
        })
            .then(res => {
                console.log(res)
                console.log(res.body)
            })
    }
}