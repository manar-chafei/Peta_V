import { 
    ADOPTION_ADD_ITEM, 
    ADOPTION_REMOVE_ITEM, 
    ADOPTION_CLEAR_ITEMS 
} from '../constants/adoptionConstants'




export const adoptionReducer = (state= { adoptionItems: []}, action) => {
    switch(action.type){
        case ADOPTION_ADD_ITEM:
            const item = action.payload
            const existItem = state.adoptionItems.find(x => x.pet === item.pet)

            if(existItem){
                return{
                    ...state,
                    adoptionItems: state.adoptionItems.map(x => 
                            x.pet === existItem.pet ? item : x)
                }

            }else{
                return{
                    ...state,
                    adoptionItems: [...state.adoptionItems, item]
                }
            }

            case ADOPTION_REMOVE_ITEM:
                return {
                    ...state,
                    adoptionItems:state.adoptionItems.filter(x => x.pet !== action.payload)
                }

            case ADOPTION_CLEAR_ITEMS:
                return{
                    ...state,
                    adoptionItems: []
                }



        default:
            return state
    }
}