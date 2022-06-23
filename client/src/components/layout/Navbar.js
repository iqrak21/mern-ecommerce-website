import React from 'react';
import "../styles/nav.css";

const Navbar = () => {

 

  return (
    <div className="nav">

      <a className="navlinks" href="/">Home</a>
      <a className="navlinks" href="/products">Products</a>
      <a className="navlinks" href="/category">Categories</a>
      <a className="navlinks" href="/services">Services</a>
      <a className="navlinks" href="/about">About us</a>
      <a className="navlinks" href="/contact">Contact us</a>
      <a className="navlinks" href="/blog">Blog</a>

   <div>
   
   <a className="navlinks my-2 my-sm-0" href="/search"><i className="fa fa-search"></i></a>

   </div>
   
    </div>
    
  )
}

export default Navbar

