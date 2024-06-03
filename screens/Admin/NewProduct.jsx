import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyle, formHeading, colors, inputOptions, inputStyling } from "../../styles/styles"
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import { Avatar, Button, TextInput } from 'react-native-paper'
import SelectComponent from '../../components/SelectComponent'
import { useMessageAndErrorOther, useSetCategories } from '../../Utils/hooks'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import mime  from 'mime'
import { createProduct } from '../../redux/actions/otherAction'

const NewProduct = ({ navigation, route }) => {

    
   const dispatch=useDispatch()
    const isFocused=useIsFocused();

    


    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [category, setCategory] = useState("Choose Category")
    const [categoryID, setCategoryID] = useState(undefined);
    const [categories, setCategories] = useState([])
    const [visible, setVisible] = useState(false);

    useSetCategories(setCategories,isFocused);

    const disableBtnCondition=!name || !description || !price || !stock || !image

    const submitHandler = () => {
    // startLoading();
     
     const myForm=new FormData();
     myForm.append("name",name);
     myForm.append("description",description);
     myForm.append("price",price);
     myForm.append("stock",stock);
     myForm.append("file",{
        uri:image,
        type: mime.getType(image),
        name:image.split("/").pop()
     });

     if(categoryID) myForm.append("category",categoryID);
     dispatch(createProduct(myForm))
     .then(() => {
        navigation.navigate("adminpanel"); 
    }).catch((error) => {
        console.error("Error processing order:", error);
    });
    }

    const {loading ,startLoading}= useMessageAndErrorOther(dispatch,navigation,"adminpanel");
    useEffect(() => {
       // console.log(route.params?.image)
        if (route.params?.image) {
            setImage(route.params.image)

        }
    }, [route.params])


    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: colors.color5, }}>
                <Header back={true} />

                {/* Heading */}

                <View style={{ marginBottom: 20, paddingTop: 70, }}>
                    <Text style={formHeading}>New Product</Text>
                </View>


                {
                    loading ? <Loader /> : (
                        <ScrollView style={{
                            padding: 20, elevation: 10, borderRadius: 10, backgroundColor: colors.color3
                        }}>

                            <View style={{
                                justifyContent: "center", height: 650
                            }}>

                                <View style={{
                                    width: 80, height: 80, alignSelf: "center", marginBottom: 20
                                }}>

                                { //  console.log("Roja")
                                  //  console.log("OUTPUT:", image)
                                }

                                    <Avatar.Image size={80} kk={20} style={{ backgroundColor: colors.color1, }}
                                        source={{ uri: image ? image : null }} />

                                    

                                    <TouchableOpacity onPress={() => navigation.navigate("camera", { newProduct: true })} >
                                        <Avatar.Icon icon={"camera"} size={30} color={colors.color3} style={{
                                            backgroundColor: colors.color2, position: "absolute", bottom: 0,
                                            right: -5,
                                        }}
                                        />
                                    </TouchableOpacity>
                                    
                                </View>




                                <TextInput {...inputOptions} placeholder='Name' value={name}
                                    onChangeText={setName} />

                                <TextInput {...inputOptions} placeholder='Description' value={description}
                                    onChangeText={setDescription} />
                                <TextInput {...inputOptions} placeholder='Price' value={price} keyboardType='number-pad'
                                    onChangeText={setPrice} />
                                <TextInput {...inputOptions} placeholder='Stock' value={stock}
                                    onChangeText={setStock} />

                                <Text style={{
                                    ...inputStyling, textAlign: 'center', borderRadius: 3, textAlignVertical: "center",
                                }} onPress={() => setVisible(true)}
                                >{category}</Text>

                                <Button textColor={colors.color2} style={{
                                    backgroundColor: colors.color1, margin: 20, padding: 6,
                                }} onPress={submitHandler} loading={loading} disabled={disableBtnCondition || loading} >Create</Button>


                            </View>


                        </ScrollView>

                    )
                }
            </View>
            <SelectComponent visible={visible} setVisible={setVisible} categories={categories}
                setCategory={setCategory} setCategoryID={setCategoryID} />
        </>
    )
}


export default NewProduct