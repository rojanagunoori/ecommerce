import {View,Text, TouchableOpacity,ScrollView} from "react-native"
import React, { useEffect, useState } from "react"
import { colors, defaultStyle } from "../styles/styles"
import Header from "../components/Header"
import { Avatar, Button } from "react-native-paper"
import SearchModal from "../components/SearchModal"
import ProductCard from "../components/ProductCard"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import Footer from "../components/Footer"
import ProductDetails from "./ProductDetails"
import Heading from "../components/Heading"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../redux/actions/productAction"
import { useSetCategories } from "../Utils/hooks"
import Toast from "react-native-toast-message"



   
const Home=()=>{
    const [category,setCategory]=useState("");
    const [activeSearch,setActiveSearch]=useState("false");
    const [searchQuery,setSearchQuery]=useState("");
    const [categories,setCategories]=useState([]);

    const navigate=useNavigation();
    const dispatch=useDispatch();
    const isFocused=useIsFocused();

    const {products}=useSelector(state=>state.product)

    const categoryButtonHandler=(id)=>{
       setCategory(id)
    }

    const addToCardHandler=(id,name,price,image,stock)=>{
        
        if(stock===0) return Toast.show({
            type:"error",
            text1:"Out Of Stock"
        })
        dispatch({
            type:"addToCart",
            payload:{
                product:id,name,price,image,stock,quantity:1
            }
        })
        Toast.show({
            type:"success",
            text1:"Added To Cart"
        })

    }
  useSetCategories(setCategories,isFocused)

//console.log("categories",category)
    useEffect(() => {
      const timeOutId= setTimeout(() => {
        dispatch(getAllProducts(searchQuery,category))
      }, 500);
      return ()=>{
        clearTimeout(timeOutId);
      }
    
    }, [dispatch,searchQuery,category])
    
    


    return(
        <>

{activeSearch && (
    <SearchModal searchQuery={searchQuery} 
    setSearchQuery={setSearchQuery}
    setActiveSearch={setActiveSearch} 
    products={products}/>
)}


        <View style={{...defaultStyle,flex:1}}>
            <Header />
           
            {/* Heading Row */}
            <View style={{
                paddingTop:70,
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
            
           }}>

                 {/*Heading */}

                 <Heading text1="Our" text2="Products"  />
           
             {/* Search Bar */}

             <View >
                <TouchableOpacity onPress={()=> setActiveSearch((prev) => !prev)}>
                    <Avatar.Icon 
                    icon={"magnify"} 
                    color={"grey"} 
                    size={50}
                    style={{backgroundColor: colors.color2 ,elevation:12}}/>
                </TouchableOpacity>
             </View>
            </View>

            {/* Categories  */}

           <View style={{flexDirection:"row",
        height:80,}}>
         <ScrollView contentContainerStyle={{alignItems:"center"}} horizontal showsHorizontalScrollIndicator={false}>
         {categories.map((item,index)=>(
            <Button key={item._id}
            style={{backgroundColor:category===item._id ?colors.color1: colors.color5,
              borderRadius:100,
              margin:5,
  
            }}
           
            onPress={()=>categoryButtonHandler(item._id)}>
              <Text style={{fontSize:12,
              color:category===item._id?colors.color2:"grey"}}>{item.category}</Text>
            </Button>
          ))} 
         </ScrollView>
           </View>

           {/* Products */}

           <View style={{flex:1}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    products.map((item,index)=>(
                        <ProductCard 
                        stock={item.stock}
                        name={item.name}
                        price={item.price}
                        image={item.images[0]?.url} 
                        addToCardHandler={addToCardHandler}
                        id={item._id}
                        key={item._id}
                        i={index}
                        navigate={navigate}
                        />
                    ))
                }
            </ScrollView>
           </View>
        </View>
        <Footer activeRoute={"home"} navigate={navigate}/>
        </>
    )   
}
export default Home