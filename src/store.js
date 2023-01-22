import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    petListReducer, 
    listMyPetsReducer, 
    petDetailsReducer,
    petDeleteReducer,
    petCreateReducer,
    petUpdateReducer,
    petReviewCreateReducer,
    petTopReducer
} from './reducers/petReducers'

import { adoptionReducer } from './reducers/adoptionReducers'

import { 
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers'

import { 
    requestCreateReducer, 
    requestDetailsReducer, 
    requestListMyReducer,
    listMyPetsRequestsReducer,
    requestListReducer,
    requestAcceptReducer,

} from './reducers/requestReducers'


const reducer = combineReducers({
    petList: petListReducer,
    petDetails: petDetailsReducer,
    petDelete: petDeleteReducer,
    petCreate: petCreateReducer,
    petUpdate: petUpdateReducer,
    petListMy: listMyPetsReducer,
    listMyPetsRequests: listMyPetsRequestsReducer,
    petReviewCreate: petReviewCreateReducer,
    petTop: petTopReducer,
    
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    adoption: adoptionReducer,
    requestCreate: requestCreateReducer,
    requestDetails: requestDetailsReducer,
    requestListMy: requestListMyReducer,
    requestList: requestListReducer,
    requestAccept: requestAcceptReducer,
    
    
    
})

const adoptionItemsFromStorage = localStorage.getItem('adoptionItems') ?
        JSON.parse(localStorage.getItem('adoptionItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    adoption: { adoptionItems: adoptionItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage },

}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store