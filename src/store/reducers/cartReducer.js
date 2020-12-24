import { types } from "../types/types";


const initialState={
    products:[]
}

export const cartReducer=(state=initialState, action)=>{

    switch (action.type) {
        
        case types.AddToCart:
            return {
            ...state,
            products: [...state.products, action.payload]

        }
        
        case types.CleanCart:
            return {
            ...state,
            products:[]

        }
            
    
        default:
            return state;
    }


}