import { fetchData } from "./fetch"



export const idFilter=async(id)=>{


    const data= await fetchData()
    const arrFiltered= data.filter(e=>e[0].id === id)

    return await arrFiltered[0]
    



}