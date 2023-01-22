import { 
    REQUEST_CREATE_REQUEST,
    REQUEST_CREATE_SUCCESS,
    REQUEST_CREATE_FAIL,

    REQUEST_CREATE_RESET,

    REQUEST_DETAILS_REQUEST,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,

    REQUEST_LIST_MY_REQUEST,
    REQUEST_LIST_MY_SUCCESS,
    REQUEST_LIST_MY_FAIL,
    REQUEST_LIST_MY_RESET,

    PET_REQUEST_LIST_MY_REQUEST,
    PET_REQUEST_LIST_MY_SUCCESS,
    PET_REQUEST_LIST_MY_FAIL,

    REQUEST_LIST_REQUEST,
    REQUEST_LIST_SUCCESS,
    REQUEST_LIST_FAIL,

    REQUEST_ACCEPT_REQUEST,
    REQUEST_ACCEPT_SUCCESS,
    REQUEST_ACCEPT_FAIL,
    REQUEST_ACCEPT_RESET,

 } from '../constants/requestConstants'


 export const requestCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_CREATE_REQUEST:
            return {
                loading: true
            }
        
        case REQUEST_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                request: action.payload
            }

            case REQUEST_CREATE_FAIL:
                return {
                    loading: false,
                    error: action.payload
                }
            
                case REQUEST_CREATE_RESET:
                    return {}
    

            default:
                return state
    }
 }

 export const requestDetailsReducer = (state = { loading:true, requestItems:[] }, action) => {
    switch (action.type) {
        case REQUEST_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case REQUEST_DETAILS_SUCCESS:
            return {
                loading: false,
                request: action.payload
            }

        case REQUEST_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
    

        default:
            return state
    }
 }

 export const requestListMyReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case REQUEST_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case REQUEST_LIST_MY_SUCCESS:
            return {
                loading: false,
                requests: action.payload
            }

        case REQUEST_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case REQUEST_LIST_MY_RESET:
            return {
                requests: []
            }

        default:
            return state
    }
 }

 export const listMyPetsRequestsReducer = (state = { requesties: [] }, action) => {
    switch (action.type) {
        case PET_REQUEST_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case PET_REQUEST_LIST_MY_SUCCESS:
            return {
                loading: false,
                requesties: action.payload
            }

        case PET_REQUEST_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
 }

 export const requestListReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case REQUEST_LIST_REQUEST:
            return {
                loading: true
            }

        case REQUEST_LIST_SUCCESS:
            return {
                loading: false,
                requests: action.payload
            }

        case REQUEST_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
 }

 export const requestAcceptReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_ACCEPT_REQUEST:
            return {
                loading: true
            }

        case REQUEST_ACCEPT_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case REQUEST_ACCEPT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case REQUEST_ACCEPT_RESET:
            return {}

        default:
            return state
    }
}