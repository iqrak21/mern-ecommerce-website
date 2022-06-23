import axios from "axios";

import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/productConstant";

export const getProduct = (keyword="",currentPage=1,category) => async (dispatch) => {

    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        });
        let link = `http://localhost:5000/api/v1/product?keyword=${keyword}&page=${currentPage}`;
if(category){
    link=`http://localhost:5000/api/v1/product?keyword=${keyword}&page=${currentPage}&category=${category}`;
}

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {

        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });

        const { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


//Errors

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}