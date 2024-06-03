import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {defaultStyle,formHeading,colors, inputOptions,inputStyling} from "../../styles/styles"
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import { Button, TextInput } from 'react-native-paper'
import SelectComponent from '../../components/SelectComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { useMessageAndErrorOther, useSetCategories } from '../../Utils/hooks'
import { getProductDetails } from '../../redux/actions/productAction'
import { updateProduct } from '../../redux/actions/otherAction'

const UpdateProduct = ({navigation,route}) => {

    const dispatch=useDispatch()
    const isFocused=useIsFocused();
    const [visible,setVisible]=useState(false);

    const {product,loading}=useSelector(state=>state.product)
 

 const [id]=useState(route.params.id)

 const [name,setName]=useState("")
 const [description,setDescription]=useState("")
 const [price,setPrice]=useState("")
 const [stock,setStock]=useState("")
 const [category,setCategory]=useState("")
 const [categoryID,setCategoryID]=useState("")
 const [categories,setCategories]=useState([])
 

 useSetCategories(setCategories,isFocused);

    const disableBtnCondition=!name || !description || !price || !stock 

 const submitHandler=()=>{
    loadingOther.startLoading();
    console.log(name,description,price,stock,categoryID)
    dispatch(updateProduct(id,name,description,price,stock,categoryID))
 }
 const loadingOther= useMessageAndErrorOther(dispatch,navigation,"adminpanel");


 useEffect(() => {
    
  dispatch(getProductDetails(id))
  

 }, [dispatch,id,isFocused])

 useEffect(() => {
    if(product){
        setName(product.name)
        setDescription(product.description)
       setPrice(String(product.price))
        setStock(String(product.stock))
        setCategory(product.category?.category)
        setCategoryID(product.category?._id)
    }
 }, [product])
 
 
 

  return (
    <>
    <View style={{...defaultStyle,backgroundColor:colors.color5,}}>
    <Header back={true}/>

{/* Heading */}

<View style={{marginBottom:20,paddingTop:70,}}>
  <Text style={formHeading}>Update Product</Text>
</View>


{
    loading?<Loader/>:(
        <ScrollView style={{
            padding:20,elevation:10,borderRadius:10,backgroundColor:colors.color3
        }}>

            <View style={{
                justifyContent:"center",height:650
            }}>

                <Button textColor={colors.color1} onPress={()=>navigation.navigate("productimages",{
                    id,images:product.images
                })}>Manage Images</Button>


                 <TextInput {...inputOptions} placeholder='Name'  value={name} 
                 onChangeText={setName}/>

                 <TextInput {...inputOptions} placeholder='Description'  value={description} 
                 onChangeText={setDescription}/>
                 <TextInput {...inputOptions} placeholder='Price'  value={price}  keyboardType='number-pad'
                 onChangeText={setPrice}/>
                 <TextInput {...inputOptions} placeholder='Stock'  value={stock} 
                 onChangeText={setStock}/>

                 <Text style={{
                    ...inputStyling,textAlign:'center',borderRadius:3,textAlignVertical:"center",
                 }} onPress={()=>setVisible(true)}
                 >{category}</Text>

                 <Button textColor={colors.color2} style={{
                    backgroundColor:colors.color1,margin:20,padding:6,
                 }} onPress={submitHandler} loading={loadingOther.loading} disabled={loadingOther.loading} >Update</Button>


            </View>


        </ScrollView>

    )
}
    </View>
    <SelectComponent visible={visible} setVisible={setVisible} categories={categories}
    setCategory={setCategory} setCategoryID={setCategoryID}/>
    </>
  )
}

export default UpdateProduct