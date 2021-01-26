import * as SecureStore from 'expo-secure-store';
import React, {useState} from 'react';
import {FontAwesome5,FontAwesome} from '@expo/vector-icons';
import {View,TouchableOpacity,StyleSheet,TextInput,Text} from 'react-native';  
import Colors from '../../constants/Colors';
import Constants from 'expo-constants';
import {Auth, auth0SignInButton} from 'aws-amplify';
import {Amplify} from 'aws-amplify';
import Icon from '../../CustomIcon';
import useColorScheme from '../../hooks/useColorScheme';
import awsConfig from '../../aws-exports';


Amplify.configure(awsConfig);


export default function Login({navigation}) {
  const [email,onEmailChange] = useState('');
  const [password, onPasswordChange] = useState('');
  const [alertText, setAlertText] = useState('');
  //added to prevent user double tap => Cognito errors out to prevent flood attacks
  const[signInDisabled, setSignInDisabled] = useState(false);
  async function handleSubmit(){
    try{
      setSignInDisabled(true);
      if (SecureStore.isAvailableAsync()){
        await SecureStore.setItemAsync('username',email);
        const user = await Auth.signIn(email,password);
        await SecureStore.setItemAsync('userId',user.username);
      }
      else{
        console.log('Cannot store credentials with SecureStore.')
      }
      
      // await resolves the promise returned from the store

      navigation.replace('Root');
    }
    catch(error){
      if (error.code == 'UserNotConfirmedException'){
        setAlertText('User not verified...');
        navigation.navigate('Verification');  
      }
      if (error.code == 'NotAuthorizedException'){
        setAlertText('Incorrect Username and Password combination.');
      }
      console.log('Could not sign in user');
      console.log(error);
    }
    finally{
      setSignInDisabled(false);
    }
    
  }

  const colorScheme = useColorScheme();
  function handleSignupNav(){
    navigation.navigate('Signup');
  }

  function handleForgotPasswordNav(){
    navigation.navigate('ForgotPassword');
  }

  return (

    <View style= {styles.background}>
      <View style = {styles.container}>
          <Icon size ={200} name = 'autoTailorsLogo' style={{marginBottom:20}} />

          <TextInput
              onChangeText = {text => onEmailChange(text)}
              placeholder = ' Email'
              value = {email}
              style = {{height:40, marginBottom:10, width:300, borderWidth:2,borderColor:'#000'}}
          />
          <TextInput
              onChangeText = {text => onPasswordChange(text)}
              secureTextEntry = {true}
              placeholder = ' Password'
              value = {password}
              style = {{height:40, width:300, marginBottom:10, borderWidth:2,borderColor:'#000'}}
          />
          <Text style={{color:'red'}}>{alertText}</Text>
          <TouchableOpacity style = {styles.button} disabled={signInDisabled} onPress={handleSubmit}>
            <Text style={styles.buttonTitle}>Sign In</Text>
          </TouchableOpacity>

          <Text style={{color:'black'}}>Don't have an account?</Text>

          <TouchableOpacity onPress={handleSignupNav}>
            <Text style={{fontSize: 25,color:Colors.all.ATGold}}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginVertical:10}} onPress={handleForgotPasswordNav}>
            <Text style={{fontSize: 15,color:Colors.all.ATGold}}>Forgot Password?</Text>
          </TouchableOpacity>
          
      </View>
    </View>
    
  )}
  

  const styles = StyleSheet.create({
    background: {
        flex:1,
        backgroundColor:'#fff'
    },
    container: {
      marginTop:Constants.statusBarHeight,
      marginHorizontal: 10,
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    logo:{
      width: 100,
      height: 100,
    },
    title: {
      marginTop: 5,
      fontSize: 30,
    },
    button:{
      width: '90%',
      marginVertical: 10,
      height: 50,
      fontSize: 30,
      backgroundColor: Colors.all.ATGold,
      alignItems:'center',
      justifyContent:'center',
      
    },
    buttonTitle:{
      fontSize:30,
      color: '#fff',
    },
    separator: {
      marginVertical: 15,
      height: 3,
      width: '95%',
    },
    separatorFixed: {
      position: "absolute",
      top: 0,
      marginVertical: 0,
      height: 3,
      width: '95%',
    },
  });