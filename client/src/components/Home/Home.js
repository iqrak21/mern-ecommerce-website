import React, { Fragment, useEffect } from "react";
import "./Home.css"
import { getProduct } from "../../actions/productAction"
import ProductCard from "../Home/ProductCard";
import Curosel from "../layout/Curosel";
import { useSelector, useDispatch } from "react-redux"



const Home = () => {

    const dispatch = useDispatch();
    const {products} = useSelector((state)=>state.products)
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])

    return (

        <Fragment>
         <Curosel/>
          

            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
              {products &&
               products.map((product) =>(
               <ProductCard key={product._id}  product={product}/>
               ))} 
              
            </div>
        </Fragment>

    );
};

export default Home;
