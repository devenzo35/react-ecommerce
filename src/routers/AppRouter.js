import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { fetchData } from "../helper/fetch";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Product from "../pages/Product";
import { loadHomeProducts } from "../store/actions/home";

export default function AppRouter() {

  const dispatch=useDispatch()

  useEffect(()=>{

    fetchData().then(res=>dispatch( loadHomeProducts(res) ))
    
  },[dispatch])

  return (
    <Router>

        <Navbar />
      
      <div>
        
        <Switch>

            <Route exact path="/" component={ Home }></Route>
            
            <Route exact path="/cart" component={ Cart }></Route>

            <Route path="/products/" component={ Product }></Route>
            
        </Switch>

      </div>
    </Router>
  );
}