import axios from 'axios'
import { 
    PET_LIST_REQUEST,
    PET_LIST_SUCCESS,
    PET_LIST_FAIL,

    PET_DETAILS_REQUEST,
    PET_DETAILS_SUCCESS,
    PET_DETAILS_FAIL,

    MY_PET_LIST_REQUEST,
    MY_PET_LIST_SUCCESS,
    MY_PET_LIST_FAIL,

    PET_DELETE_REQUEST,
    PET_DELETE_SUCCESS,
    PET_DELETE_FAIL,

    PET_CREATE_REQUEST,
    PET_CREATE_SUCCESS,
    PET_CREATE_FAIL,

    PET_UPDATE_REQUEST,
    PET_UPDATE_SUCCESS,
    PET_UPDATE_FAIL,

    PET_CREATE_REVIEW_REQUEST,
    PET_CREATE_REVIEW_SUCCESS,
    PET_CREATE_REVIEW_FAIL,

    PET_TOP_REQUEST,
    PET_TOP_SUCCESS,
    PET_TOP_FAIL,
    
    

 } from '../constants/petConstants'

 export const listPets = ( keyword = '' ) => async(dispatch) => {
    try {
        dispatch({ type: PET_LIST_REQUEST })

        const { data } = await axios.get(`/api/pets${keyword}`)

        dispatch({
            type: PET_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PET_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })

    }

 }

 export const listTopPets = () => async (dispatch) => {
    try {
        dispatch({ type: PET_TOP_REQUEST })

        const { data } = await axios.get(`/api/pets/top/`)

        dispatch({
            type: PET_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PET_TOP_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })

    }

 }

 export const listPetDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PET_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/pets/${id}`)

        dispatch({
            type: PET_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PET_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })

    }

 }
 
 export const listMyPets = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_PET_LIST_REQUEST
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
            `/api/pets/profile/mypets/`,
            config
            )
        
        dispatch({
            type: MY_PET_LIST_SUCCESS,
            payload: data
        })
        

    } catch (error) {
        dispatch({
            type: MY_PET_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
 }

 export const deletePet = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PET_DELETE_REQUEST
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

        const { data } = await axios.delete(
            `/api/pets/delete/${id}`,
            config
            )
        
        dispatch({
            type: PET_DELETE_SUCCESS,
        })
        

    } catch (error) {
        dispatch({
            type: PET_DELETE_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
 }

 export const createPet = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PET_CREATE_REQUEST
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
            `/api/pets/create/`,
            {},
            config
            )
        
        dispatch({
            type: PET_CREATE_SUCCESS,
            payload: data,
        })
        

    } catch (error) {
        dispatch({
            type: PET_CREATE_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
 }

 export const updatePet = (pet) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PET_UPDATE_REQUEST
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

        const { data } = await axios.put(
            `/api/pets/update/${pet._id}/`,
            pet,
            config
            )
        
        dispatch({
            type: PET_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: PET_DETAILS_SUCCESS, 
            payload: data
        })
        

    } catch (error) {
        dispatch({
            type: PET_UPDATE_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
 }

 export const createPetReview = (petId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PET_CREATE_REVIEW_REQUEST
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
            `/api/pets/${petId}/reviews/`,
            review,
            config
            )
        
        dispatch({
            type: PET_CREATE_REVIEW_SUCCESS,
            payload: data,
        })
        

    } catch (error) {
        dispatch({
            type: PET_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
 }