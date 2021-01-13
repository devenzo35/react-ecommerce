import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const  PrivateRoute = ({
    component: Component,
    isLogin,
    ...rest
}) => {
    return (
        <Route
        {...rest}
        component={props=>{
            
            return (isLogin)
            ? <Component {...props}></Component>
            : <Redirect to="/auth"></Redirect>
        }}
        
        >
        
            
        </Route>
    )
}