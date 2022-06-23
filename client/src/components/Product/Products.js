import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useSelector,useDispatch } from 'react-redux';
import ProductCard from '../Home/ProductCard';
import { getProduct } from '../../actions/productAction';
import Pagination from "react-js-pagination";


const Products = ({match}) => {
    const dispatch = useDispatch();
    const [currentPage,setCurrentPage] = useState(1);
  
    
    
    const {products,productsCount,resultperpage} = useSelector((state)=>state.products);

    const keyword = match.params.keyword;

    const setCurrentPageNo=(e)=>{
          setCurrentPage(e)
    };


    useEffect(() => {
        
       dispatch(getProduct(keyword,currentPage))
       
      }, [dispatch,keyword,currentPage])
  return (
    <Fragment>
          <h2 className="productsHeading">Products</h2>

<div className="products">
  {products &&
    products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  
</div>

 <div className='paginationBox'>
  <Pagination
    activePage={currentPage}
    itemsCountPerPage={resultperpage}
    totalItemsCount={productsCount}
    onChange={setCurrentPageNo}
    nextPageText="Next"
    prevPageText="Prev"
    firstPageText="1st"
    lastPageText="Last"
    itemClass="page-item"
    linkClass="page-link"
    activeClass="pageItemActive"
    activeLinkClass="pageLinkActive"
  />
</div>
    </Fragment>
  )
}

export default Products