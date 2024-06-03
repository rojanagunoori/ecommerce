import { View, Text,  TouchableOpacity } from 'react-native'
import React, {  useState } from 'react'
import { colors,defaultStyle,formHeading,inputOptions,formStyles as styles } from '../styles/styles'
import { Button, TextInput } from 'react-native-paper'
import Footer from '../components/Footer'
import {useDispatch} from "react-redux"
import { login } from '../redux/actions/userActions'

import { useMessageAndErrorUser } from '../Utils/hooks'
       



const Login = ({navigation}) => {


const [email,setEmail]=useState("")
const [password,setPassword]=useState("");

const dispatch=useDispatch();
const {loading,startLoading}= useMessageAndErrorUser(navigation,dispatch,"profile")


//console.log(isAuthenticated);

//const loading=false;

//console.log(message,error,isAuthenticated);


const submitHandler=()=>{
   startLoading()
   dispatch(login(email,password));
};


  return (
    <>
    <View style={{...defaultStyle,backgroundColor:colors.color2}} >

        {/* Heading */}

        <View style={{marginBottom:20}}>
            <Text style={formHeading}>Login</Text>
        </View>

        <View style={styles.container}>

        <TextInput {...inputOptions} placeholder='Email'  value={email} 
        keyboardType='email-address'
        onChangeText={setEmail}/>

<TextInput {...inputOptions} placeholder='Password'  value={password} 
       secureTextEntry={true}
        onChangeText={setPassword}/>

        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("forgetpassword")}>
            <Text style={styles.forget}>Forget Password?</Text>
        </TouchableOpacity>

           <Button textColor={colors.color2} loading={loading}
           disabled={email==="" || password===""} style={styles.btn}
           onPress={submitHandler}
          >Log In</Button>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("login")}
          >
            <Text style={styles.link}  onPress={()=>navigation.navigate("signup")}>Sign up</Text>
          </TouchableOpacity>

        </View>


     
    </View>
    <Footer activeRoute='profile'/>
    </>
  )
}






export default Login