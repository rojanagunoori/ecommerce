import { View, Text,  TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors,defaultStyle,formHeading,inputOptions,formStyles as styles} from '../styles/styles'
import { Button, TextInput } from 'react-native-paper'
import Footer from '../components/Footer'
import { useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { forgetPassword } from '../redux/actions/otherAction'
import { useMessageAndErrorOther } from '../Utils/hooks'
       



const ForgetPassword = ({navigation}) => {


const [email,setEmail]=useState("");

const dispatch=useDispatch();
const isFocused=useIsFocused();



const submitHandler=()=>{
  startLoading();

dispatch(forgetPassword(email))
    //alert("Yeah")
     //will remove this in future
   //  navigation.navigate("verify")
}
const {loading,startLoading}=useMessageAndErrorOther(dispatch,navigation,"verify")

  return (
    <>
    <View style={{...defaultStyle,backgroundColor:colors.color2}} >

        {/* Heading */}

        <View style={{marginBottom:20}}>
            <Text style={formHeading}>Forget Password</Text>
        </View>

        <View style={styles.container}>

        <TextInput {...inputOptions} placeholder='Email'  value={email} 
        keyboardType='email-address'
        onChangeText={setEmail}/>




           <Button textColor={colors.color2} loading={loading}
           disabled={email===""} style={styles.btn}
           onPress={submitHandler}
          >Send OTP</Button>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("login")}
          >
            <Text style={styles.link}>Log In</Text>
          </TouchableOpacity>

        </View>


     
    </View>
    <Footer activeRoute='profile'/>
    </>
  )
}






export default ForgetPassword