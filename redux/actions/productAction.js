import axios from "axios";
import { server } from "../store";


export const getAllProducts=(keyword,category)=>async(dispatch)=>{
    try {
       dispatch({
        type:"getAllProductsRequest",

       }) ;

       //Axois here

       const {data}=await axios.get(`${server}/product/all?keyword=${keyword}&category=${category}`,{
        withCredentials:true
       })
      

       dispatch({
        type:"getAllProductsSuccess",
        payload:data.products
       }) ;
    } catch (error) {
        dispatch({
            type:"getAllProductsFail",
            payload:error.response.data.message
    
           }) ;
    }
}


export const getAdminProducts=()=>async(dispatch)=>{
    try {
       dispatch({
        type:"getAdminProductsRequest",

       }) ;

       //Axois here

       const {data}=await axios.get(`${server}/product/admin`,{
        withCredentials:true
       })
      //console.log("data admin",data)
  
       dispatch({
        type:"getAdminProductsSuccess",
        payload:data
       }) ;
    } catch (error) {
        dispatch({
            type:"getAdminProductsFail",
            payload:error.response.data.message
    
           }) ;
    }
}

export const getProductDetails=(id)=>async(dispatch)=>{
   // console.log("id",id)
    try {
       dispatch({
        type:"getProductDetailsRequest",

       }) ;

       //Axois here
       
       const {data}=await axios.get(`${server}/product/single/${id}`,{
        withCredentials:true
       })
      

       dispatch({
        type:"getProductDetailsSuccess",
        payload:data.product
       }) ;
    } catch (error) {
        dispatch({
            type:"getProductDetailsFail",
            payload:error.response.data.message
    
           }) ;
    }
}