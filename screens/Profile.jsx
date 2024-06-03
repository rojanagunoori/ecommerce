import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultImg, defaultStyle,formHeading } from '../styles/styles'
import {Avatar, Button} from "react-native-paper"
import ButtonBox from '../components/ButtonBox'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, logout } from '../redux/actions/userActions'
import { useMessageAndErrorOther, useMessageAndErrorUser } from '../Utils/hooks'
import { useIsFocused } from '@react-navigation/native'
import mime from "mime"
import { updatePic } from '../redux/actions/otherAction'



/*const user={

  name:"Abhishek",email:"sample@gmail.com"

}*/

const Profile = ({navigation,route}) => {
  const {user}=useSelector(state=>state.user)
  //console.log(user)
  const { image } = route.params || {};
  const [avatar,setAvatar]=useState(user?.avatar?user.avatar.url:defaultImg);


  const dispatch=useDispatch();
  const isFocused=useIsFocused();

 

  const {loading,startLoading}= useMessageAndErrorUser(navigation,dispatch,"login")

  const logoutHandler=()=>{
    startLoading();
    dispatch(logout())
  // console.log("Signing Out")
  }

  const navigateHandler=(text)=>{
    switch (text) {
      case "Admin":
        navigation.navigate("adminpanel")
        break;
      case "Orders":
        navigation.navigate("Orders")
        break;
      case "Profile":
        navigation.navigate("updateprofile")
        break;
      case "Password":
        navigation.navigate("changepassword")
        break;
      case "Sign Out":
        logoutHandler()
        break;
                        
      default:
        case "Orders":
          navigation.navigate("orders")
          break;
       
    }

  }

  

  useEffect(() => {
    if (isFocused) {
      dispatch(loadUser())
        .then(() => {
          setAvatar(user?.avatar?.url || defaultImg);
        })
        .catch((error) => {
          console.error('Error loading user data:', error);
        });
    }
  }, [dispatch, isFocused, user]);
  const loadingPic=useMessageAndErrorOther(dispatch,null,null,loadUser)
  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image);
      const myForm=new FormData();
      myForm.append("file",{
        uri: route.params.image,
        type: mime.getType(route.params.image),
        name: route.params.image.split("/").pop()
      });
    dispatch(updatePic(myForm));

     
    }
    dispatch(loadUser())
  }, [route.params,dispatch]);

  /*useEffect(() => {
    if(user?.avatar){
      setAvatar(user.avatar.url)
    }
  
  }, [user])*/
  


 //console.log("lodingPc",loadingPic)


  return (
    <>
    <View style={{...defaultStyle}} >

        {/* Heading */}

        <View style={{marginBottom:20}}>
            <Text style={formHeading}>Profile</Text>
        </View>

        {/* Loading */}

        {loading?<Loader/>:(
          <>
           <View style={styles.container}>
          <Avatar.Image 
          //source={{ uri: image ? image : null }}
          source={{uri:avatar}}
           size={100} style={{backgroundColor:colors.color1}}/>

           <TouchableOpacity disabled={loadingPic.loading} onPress={()=>navigation.navigate("camera",{updateprofile :true})}>
    <Button disabled={loadingPic.loading} loading={loadingPic.loading} textColor={colors.color1}>Change Photo</Button>
           </TouchableOpacity>

           <Text style={styles.name}> {user?.name}</Text>
           <Text style={{fontWeight:"300",color:colors.color2}}> {user?.email}</Text>
  

        </View>
        <View>
          <View style={{
            flexDirection:"row",
            margin:10,
            justifyContent:"space-between"
          }}>

<ButtonBox handler={navigateHandler} text={"Orders"} icon={"format-list-bulleted-square"} />
{
  user?.role==="admin" && (
    <ButtonBox handler={navigateHandler}  icon={"view-dashboard"} text={"Admin"} reverse={true} />
  )
}
<ButtonBox handler={navigateHandler}  text={"Profile"} icon={"pencil"} />



          </View>
          <View style={{
            flexDirection:"row",
            margin:10,
            justifyContent:"space-evenly"
          }}>
            <ButtonBox handler={navigateHandler}  text={"Password"} icon={"pencil"} />
            <ButtonBox handler={navigateHandler}  text={"Sign Out"} icon={"exit-to-app"} />
          </View>



        </View></>
        )}

       
</View>

<Footer   />
</>
  )
  }

  const  styles=StyleSheet.create({
    container:{
      elevation:7,
      backgroundColor:colors.color3,
      padding:30,
      borderRadius:10,
      alignItems:"center",
     
    },
    name:{
      fontWeight:"500",
      fontSize:20,
      marginTop:10,
      color:colors.color2,

      
    }
  })

export default Profile