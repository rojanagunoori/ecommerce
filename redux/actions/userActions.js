import axios from "axios";
import { server } from "../store"

export const register=(formData)=>async(dispatch)=>{
 //console.log("formData",formData)
    try {
       dispatch({
        type:"registerRequest",

       }) ;

       //Axois here

       const {data}=await axios.post(`${server}/user/new`,
       formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        },
        withCredentials:true
       })
       //console.log("data console",data)

       dispatch({
        type:"registerSuccess",
        payload:data.message

       }) ;
     //  console.log("Succeess", data.message);
      
    } catch (error) {
     //   console.log("User validation error:", error.response.data.message);
        dispatch({
            type:"registerFail",
            payload:error.response.data.message
    
           }) ;
    }
}

export const login=(email,password)=>async(dispatch)=>{
 
    try {
       dispatch({
        type:"loginRequest",

       }) ;

       //Axois here

       const {data}=await axios.post(`${server}/user/login`,{
        email,password
       },{
        headers:{
            "Content-Type":"application/json",
        },
        withCredentials:true
       })

       dispatch({
        type:"loginSuccess",
        payload:data.message

       }) ;
    } catch (error) {
        dispatch({
            type:"loginFail",
            payload:error.response.data.message
    
           }) ;
    }
}
export const loadUser=()=>async(dispatch)=>{
    try {
       dispatch({
        type:"loadUserRequest",

       }) ;

       //Axois here

       const {data}=await axios.get(`${server}/user/me`,{
        withCredentials:true
       })
      

       dispatch({
        type:"loadUserSuccess",
        payload:data.user
       }) ;
    } catch (error) {
        dispatch({
            type:"loadUserFail",
            payload:error.response.data.message
    
           }) ;
    }
}

export const logout=()=>async(dispatch)=>{
    try {
       dispatch({
        type:"logoutRequest",

       }) ;

       //Axois here

       const {data}=await axios.get(`${server}/user/logout`,{
        withCredentials:true
       })
      

       dispatch({
        type:"logoutSuccess",
        payload:data.message
       }) ;
    } catch (error) {
        dispatch({
            type:"logoutFail",
            payload:error.response.data.message
    
           }) ;
    }
}