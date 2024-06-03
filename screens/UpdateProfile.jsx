import { View, Text,  ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors,defaultStyle,formHeading,inputOptions,formStyles as styles} from '../styles/styles'
import {  Button, TextInput } from 'react-native-paper'

import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../redux/actions/otherAction'
import { useMessageAndErrorOther } from '../Utils/hooks'


       



const UpdateProfile = ({navigation}) => {

const {user}=useSelector(state=>state.user);

const [name,setName]=useState(user?.name)
const [email,setEmail]=useState(user?.email)

const [address,setAddress]=useState(user?.address)
const [city,setCity]=useState(user?.city)
const [country,setCountry]=useState(user?.country)
const [pinCode,setPinCode]=useState(user?.pinCode.toString())

const dispatch=useDispatch();


const {loading,startLoading}=useMessageAndErrorOther(dispatch,navigation,"profile")
const submitHandler=()=>{
  startLoading()
    dispatch(updateProfile(name,email,address,city,country,pinCode))
    
}


  return (
    <>
    <View style={{...defaultStyle,backgroundColor:colors.color2}} >
        <Header back={true}/>

        {/* Heading */}

        <View style={{marginBottom:20,paddingTop:70,}}>
            <Text style={formHeading}>Edit Profile</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{
            padding:20,elevation:10,borderRadius:10,backgroundColor:colors.color3,}}>

            <View >



                
               
               
                <TextInput {...inputOptions} placeholder='Name'  value={name} 

onChangeText={setName}/>

<TextInput {...inputOptions} placeholder='Email'  value={email} 
keyboardType='email-address'
onChangeText={setEmail}/>

<TextInput {...inputOptions} placeholder='Address'  value={address} 

onChangeText={setAddress}/>
<TextInput {...inputOptions} placeholder='City'  value={city} 

onChangeText={setCity}/>
<TextInput {...inputOptions} placeholder='Country'  value={country} 

onChangeText={setCountry}/>
<TextInput {...inputOptions} placeholder='Pin Code'  value={pinCode} 

onChangeText={setPinCode}/>









   <Button textColor={colors.color2} loading={loading}
   style={styles.btn}
   onPress={submitHandler}
  >Update</Button>

  
  

</View>


</ScrollView>

        
    </View>
    
    </>
  )
}










export default UpdateProfile