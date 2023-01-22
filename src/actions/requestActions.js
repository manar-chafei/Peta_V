import axios from 'axios'
import { 
    REQUEST_CREATE_REQUEST,
    REQUEST_CREATE_SUCCESS,
    REQUEST_CREATE_FAIL,

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

import { ADOPTION_CLEAR_ITEMS } from '../constants/adoptionConstants'


 export const createRequest = (request) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/requests/add/`,
            request,
            config
            )
        
            dispatch({
                type: REQUEST_CREATE_SUCCESS,
                payload: data
            })

            dispatch({
                type: ADOPTION_CLEAR_ITEMS,
                payload: data
            })

            localStorage.removeItem('adoptionItems')
        

    } catch (error) {
        dispatch({
            type: REQUEST_CREATE_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
 }


 export const getRequestDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/requests/${id}/`,
            config
            )
        
        dispatch({
            type: REQUEST_DETAILS_SUCCESS,
            payload: data
        })
        

    } catch (error) {
        dispatch({
            type: REQUEST_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
 }


 export const listMyRequests = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_LIST_MY_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/requests/myrequests/`,
            config
            )
        
        dispatch({
            type: REQUEST_LIST_MY_SUCCESS,
            payload: data
        })
        

    } catch (error) {
        dispatch({
            type: REQUEST_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
 }

 export const requestMyPetsList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PET_REQUEST_LIST_MY_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/requests/profile/petrequests/`,
            config
            )
        
        dispatch({
            type: PET_REQUEST_LIST_MY_SUCCESS,
            payload: data
        })
        

    } catch (error) {
        dispatch({
            type: PET_REQUEST_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
 }

 export const listRequests = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/requests/`,
            config
            )
        
        dispatch({
            type: REQUEST_LIST_SUCCESS,
            payload: data
        })
        

    } catch (error) {
        dispatch({
            type: REQUEST_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
 }

 export const acceptRequest = (request) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REQUEST_ACCEPT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/requests/${request._id}/accept/`,
            {},
            config
        )

        dispatch({
            type: REQUEST_ACCEPT_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: REQUEST_ACCEPT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}