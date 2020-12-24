import { types } from "../types/types";

const initialState={
    products:[]
}

export const homeReducer=(state=initialState, action)=>{

    switch (action.type) {
        
        case types.LoadProducts:
            return {
                ...state,
                products: action.payload
            }

        case types.addNewProduct:
                return {
                    ...state,
                    products: [ [action.payload], ...state.products ]
                }

        /* case types.deleteProduct:
            console.log(action.payload)
            return {
                ...state,
                products: state.products.filter(product=> product[0].id !== action.payload )
            } */
    
        default:
            return state;
    }




}