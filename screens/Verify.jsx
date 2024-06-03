import { View, Text,  TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors,defaultStyle,formHeading,inputOptions,formStyles as styles} from '../styles/styles'
import { Button, TextInput } from 'react-native-paper'
import Footer from '../components/Footer'
import { useMessageAndErrorOther } from '../Utils/hooks'
import { useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { resetPassword } from '../redux/actions/otherAction'
       



const Verify= ({navigation}) => {


const [otp,setOtp]=useState("")
const [password,setPassword]=useState("")
const dispatch=useDispatch();
const isFocused=useIsFocused();

const {loading,startLoading}=useMessageAndErrorOther(dispatch,navigation,"login")


const submitHandler=()=>{
    startLoading();
    dispatch(resetPassword(otp,password))
    // navigation.navigate("login")
}


  return (
    <>
    <View style={{...defaultStyle,backgroundColor:colors.color2}} >

        {/* Heading */}

        <View style={{marginBottom:20}}>
            <Text style={formHeading}>Reset Password</Text>
        </View>

        <View style={styles.container}>

        <TextInput {...inputOptions} placeholder='OTP'  value={otp} 
        keyboardType="number-pad"
        onChangeText={setOtp}/>

<TextInput {...inputOptions} placeholder='New Password'  value={password} 
       secureTextEntry={true}
        onChangeText={setPassword}/>



           <Button textColor={colors.color2} loading={loading}
           disabled={otp==="" || password==="" } style={styles.btn}
           onPress={submitHandler}
          >Send OTP</Button>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("forgetpassword")}
          >
            <Text style={styles.link}>Resend OTP</Text>
          </TouchableOpacity>

        </View>


     
    </View>
    <Footer activeRoute='profile'/>
    </>
  )
}








export default Verify