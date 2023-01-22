import axios from 'axios'
import { 
    ADOPTION_ADD_ITEM, 
    ADOPTION_REMOVE_ITEM 
} from '../constants/adoptionConstants'

export const addToAdoption = (id, adp) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/pets/${id}`)

    dispatch({
        type: ADOPTION_ADD_ITEM,
        payload: {
            pet: data._id,
            name: data.name,
            image: data.image,
            description: data.description,
            owner: data.user.email,
            address: data.address,
            phone: data.phone,
            adp
        }
    })

    localStorage.setItem('adoptionItems', JSON.stringify(getState().adoption.adoptionItems))

    
}


export const removeFromAdoption = (id) => (dispatch, getState) => {
    dispatch({
        type: ADOPTION_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('adoptionItems', JSON.stringify(getState().adoption.adoptionItems))
}


