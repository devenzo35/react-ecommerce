import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { fetchData } from "../helper/fetchData";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Product from "../pages/Product";
import { loadCart } from "../store/actions/cart";
import { loadHomeProducts } from "../store/actions/home";

export const Dashboard=() =>{
  
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData().then((res) => dispatch(loadHomeProducts(res)));
    dispatch(loadCart());
  }, [dispatch]);


  return (
    <Router>
      
      <Navbar />

      <div>
        <Switch>

          <Route exact path="/" component={Home}></Route>

          <Route exact path="/cart" component={Cart}></Route>

          <Route path="/products/" component={Product}></Route>

          <Redirect to="/"></Redirect> 

        </Switch>
      </div>
    </Router>
  );
}

