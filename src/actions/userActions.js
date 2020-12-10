import { userActions } from '../constants'
import { SHOW_LOADER, HIDE_LOADER } from './loaderAction'
import { baseUrl, setToken, setRefresheToken, setIsFirst, setUserId, processResponse } from '../utilities';
import axios from 'axios'

export const LoginRequest = (details) => {
    console.warn( JSON.parse(details).Identity)
    return (dispatch) => {
        dispatch(SHOW_LOADER('Verifying in..'))
        fetch(baseUrl() + 'verifyface', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, body: details
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                if (statusCode === 200) {
                    setToken(JSON.parse(details).Identity)
                    dispatch(LoginSuccess(data))
                    dispatch(HIDE_LOADER())
                } else if (statusCode === 500) {
                    dispatch(HIDE_LOADER())
                    dispatch(LoginFailure('No match was found for this user'))
                } else if (statusCode === 400) {
                    dispatch(HIDE_LOADER())
                    dispatch(LoginFailure('No match was found for this user'))
                } else {
                    dispatch(HIDE_LOADER())
                    dispatch(LoginFailure(data.message))
                }
            })
            .catch((error) => {
                dispatch(HIDE_LOADER())
                dispatch(GetUserFailure('No Internet Connection. Please Check your network'))
            });

    }
}
const FetchDefaultState = () => {
    return {
        type: userActions.LOGIN_REQUEST,
    }
}
export const LoginFailure = (error) => {
    return {
        type: userActions.LOGIN_FAILURE,
        error
    }
}
export const LoginSuccess = (user) => {
    return {
        type: userActions.LOGIN_SUCCESS,
        payload: user
    }
}

export const RegisterRequest = (details) => {
    return (dispatch) => {
        dispatch(SHOW_LOADER('Creating...'))
        fetch(baseUrl() + 'registration', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, body: details,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                if (statusCode === 200) {
                    setToken(JSON.parse(details).Identity)
                    dispatch(RegisterSuccess(data))
                    dispatch(HIDE_LOADER())
                } else if (statusCode === 422) {
                    dispatch(HIDE_LOADER())
                    dispatch(RegisterFailure(data.message))
                } else {
                    dispatch(HIDE_LOADER())
                    dispatch(RegisterFailure(data.message))
                }
            })
            .catch((error) => {
                dispatch(HIDE_LOADER())
                dispatch(GetUserFailure('No Internet Connection. Please Check your network'))
            });


    }
}

const FetchRegeDefaultState = () => {
    return {
        type: userActions.REGISTER_REQUEST,
    }
}
export const RegisterFailure = (error) => {
    return {
        type: userActions.REGISTER_FAILURE,
        error
    }
}
export const RegisterSuccess = (user) => {
    return {
        type: userActions.REGISTER_SUCCESS,
        payload: user
    }
}


export const GetUserRequest = (details) => {
    return (dispatch) => {
        dispatch(SHOW_LOADER('Processing...'))
        fetch(baseUrl() + 'GetUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, body: details,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(data)
                dispatch(GetUserSuccess(data))
                if (statusCode === 200) {
                    dispatch(GetUserSuccess(data))
                    dispatch(HIDE_LOADER())
                } else if (statusCode === 400) {
                    dispatch(HIDE_LOADER())
                    dispatch(GetUserFailure(data.message))
                }else if (statusCode === 500) {
                    dispatch(HIDE_LOADER())
                    dispatch(GetUserFailure(data.message))
                } else {
                    dispatch(HIDE_LOADER())
                    dispatch(GetUserSuccess(data))
                }
            })
            .catch((error) => {
                dispatch(HIDE_LOADER())
                console.warn(error)
                dispatch(GetUserFailure('No Internet Connection. Please Check your network'))
            });

    }
}

const FetchFGDefaultState = () => {
    return {
        type: userActions.GET_USER_REQUEST,
    }
}
export const GetUserFailure = (error) => {
    return {
        type: userActions.GET_USER_FAILURE,
        error
    }
}
export const GetUserSuccess = (user) => {
    return {
        type: userActions.GET_USER_SUCCESS,
        payload: user
    }
}

