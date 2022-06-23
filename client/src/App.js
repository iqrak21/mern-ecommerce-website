import React from "react";
import Footer from "./components/layout/Footer/Footer.js";
import Navbar from "./components/layout/Navbar";
import Home from "./components/Home/Home.js"
import { Route, BrowserRouter,} from 'react-router-dom'
import PreNavbar from "./components/layout/PreNavbar";
import Heading from "./components/layout/Heading.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js"
import Search from "./components/Product/Search.js"
import Category from "./components/Product/Category"





function App() {
  return (
    <BrowserRouter>
    <PreNavbar/>
    <Heading/>
   <Navbar/>

   <Route exact path="/" component={Home} />
   <Route exact path="/product/:id" component={ProductDetails} />
   <Route exact path="/products" component={Products} />
   <Route  path="/products/:keyword" component={Products} />
   <Route exact path="/search" component={Search} />
  
  
   
  
   <Footer/>

   </BrowserRouter>
  );
}

export default App;
