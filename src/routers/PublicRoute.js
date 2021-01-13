import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const  PublicRoute = ({
    component: Component,
    isLogin,
    ...rest
}) => {
    return (
        <Route
        {...rest}
        component={props=>{

            return (isLogin)
            ? <Redirect to="/"></Redirect>
            : <Component {...props}></Component>
        }}
        
        >
        
            
        </Route>
    )
}
