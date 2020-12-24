import { types } from "../types/types";


export const loadHomeProducts=(products)=>({

    type: types.LoadProducts,
    payload: products

})

export const createProduct=(name, description, price, image)=>{

    return async (dispatch)=>{
        
         try{
             
            const getProducts= await fetch('https://api.stripe.com/v1/products',{
            method:'POST',
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "authorization": "Bearer sk_test_51HxMyeFjaqj6StBqs4BjSqfiUW1w3vI6zMMneU86XYQ7E7S0grMYM6It5UzWvFf2xrrQU01uJ7qqOV77ETMcpJHZ00f5M9PgHg"
            },
            body: (`name=${name}&description=${description}&images[0]=${image.imgUrl}`)
            
        })
        
        const products= await getProducts.json()

        const getPrices=await fetch('https://api.stripe.com/v1/prices',{
            method:'POST',
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "authorization": "Bearer sk_test_51HxMyeFjaqj6StBqs4BjSqfiUW1w3vI6zMMneU86XYQ7E7S0grMYM6It5UzWvFf2xrrQU01uJ7qqOV77ETMcpJHZ00f5M9PgHg"
            },
            body: (`unit_amount=${price}&product=${products.id}&currency=usd`)
        })
        
        const prices=await getPrices.json()
        
        products.priceInfo={
            currency:prices.currency,
            unit: (prices.unit_amount).toString(),
            priceId: prices.id

        }
        
        dispatch( addNewProduct(products)) 
    
    }catch(error){

        console.log(error)
    }
        
    }
        
        
    }


const addNewProduct=(newProduct)=>({
    type: types.addNewProduct,
    payload: newProduct
})


/* export const startDeleteProduct=(productId, priceId)=>{

    return async(dispatch)=>{

        console.log(productId, priceId)
        try{
            
            const algo1= await fetch(`https://api.stripe.com/v1/prices/${ priceId }`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded",
                    'authorization': 'Bearer sk_test_51HxMyeFjaqj6StBqs4BjSqfiUW1w3vI6zMMneU86XYQ7E7S0grMYM6It5UzWvFf2xrrQU01uJ7qqOV77ETMcpJHZ00f5M9PgHg'
                },
                body:(`active=false`) 
            }
            )
            const algo=await fetch(`https://api.stripe.com/v1/products/${productId}`, {
                    method: 'DELETE', 
                    headers:{
                        'authorization': 'Bearer sk_test_51HxMyeFjaqj6StBqs4BjSqfiUW1w3vI6zMMneU86XYQ7E7S0grMYM6It5UzWvFf2xrrQU01uJ7qqOV77ETMcpJHZ00f5M9PgHg'
                    }
                })

                console.log(await algo1.json())
        
            dispatch( deleteProduct(productId) )
        }catch(error){

            console.log(error)
        }
        
        
    }

}

const deleteProduct=(id)=>({

    type: types.deleteProduct,
    payload: id
}) */