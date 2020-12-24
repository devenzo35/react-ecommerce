import { types } from '../types/types'

export const addProduct=( product )=>({

type: types.AddToCart,
payload: product



})

export const cleanCart=()=>({ type: types.CleanCart})