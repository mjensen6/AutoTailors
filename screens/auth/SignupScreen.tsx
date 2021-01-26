import * as SecureStore from 'expo-secure-store';
import React, {useRef,useState} from 'react';
import {View,TouchableOpacity,StyleSheet,TextInput,Text} from 'react-native';  
import Colors from '../../constants/Colors';
import Constants from 'expo-constants';
import {Auth, auth0SignInButton} from 'aws-amplify';
import {Amplify} from 'aws-amplify';
import Icon from '../../CustomIcon';
import useColorScheme from '../../hooks/useColorScheme';
import awsConfig from '../../aws-exports';


Amplify.configure(awsConfig);

export default function SignUp({navigation}) {
  const [email,onEmailChange] = useState('');
  const [password, onPasswordChange] = useState('');
  const [confirmPassword, onConfirmPasswordChange] = useState('');
  const[phoneNumber, onPhoneNumberChange] = useState('');
  const[firstName, onFirstNameChange] = useState('');
  const[lastName, onLastNameChange] = useState('');
  const[alertText, setAlertText] = useState('');

  async function handleSubmit(){
    if (errorChecking()){
      try{
        const{user} = await Auth.signUp({
            username: email,
            password: password,
            attributes:{
                'custom:firstName': firstName,
                'custom:lastName': lastName,
                'custom:phoneNumber' : phoneNumber,
            }
        });

        if (SecureStore.isAvailableAsync()){
          await SecureStore.setItemAsync('username',email);
        }

        navigation.navigate('Verification');
    
      }
      catch(error){
        if(error.code=='UsernameExistsException'){
          setAlertText('A user with this email already exists. Please try signing in.');
        }else{
          console.log('Could not sign up user');
          setAlertText('Failed to signup user. Please try again.');
          console.log(error);
        }
      }
    }
  }

  const colorScheme = useColorScheme();
  function handleSignInNav(){
    navigation.navigate('Login');
  }

  function errorChecking(){
    let pass = true;
    const emailReg = new RegExp(/^\S+@\S+\.\S+$/);
    if(!emailReg.test(email)){
      setAlertText('Email is not valid. Please try again.');
      pass = false;
    }
    if (password != confirmPassword){
      setAlertText('Passwords do not match. Please try again.');
      pass = false;
    }

    const passwordReg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,49}$/);
    if (!passwordReg.test(password)){
      setAlertText('Password not valid. Must be 8 characters containing uppercase, lowercase, special characters, and numbers.');
      pass = false;
    }
    const phoneReg = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
    if(!phoneReg.test(phoneNumber)){
      setAlertText('Phone Number not valid.  Please try again.');
      pass = false;
    }

    return pass;
  }



  return (

    <View style= {styles.background}>
      <View style = {styles.container}>
          <Icon size ={200} name = 'autoTailorsLogo' style={{marginBottom:20}} />

          <TextInput
              returnKeyType = 'next'
              textContentType = 'emailAddress'
              keyboardType = 'email-address'
              onChangeText = {text => onEmailChange(text)}
              placeholder = ' Email'
              value = {email}
              style = {{height:40, marginBottom:10, width:300, borderWidth:2,borderColor:'#000'}}
          />
          <TextInput
              returnKeyType = 'next'
              onChangeText = {text => onPasswordChange(text)}
              secureTextEntry = {true}
              placeholder = ' Password'
              value = {password}
              style = {{height:40, width:300, marginBottom:10, borderWidth:2,borderColor:'#000'}}
          />
          <TextInput
              onChangeText = {text => onConfirmPasswordChange(text)}
              returnKeyType = 'next'
              secureTextEntry = {true}
              placeholder = ' Confirm Password'
              value = {confirmPassword}
              style = {{height:40, width:300, marginBottom:10, borderWidth:2,borderColor:'#000'}}
          />
          <TextInput
              onChangeText = {text => onFirstNameChange(text)}
              returnKeyType = 'next'
              placeholder = ' First Name'
              value = {firstName}
              style = {{height:40, width:300, marginBottom:10, borderWidth:2,borderColor:'#000'}}
          />
          <TextInput
              onChangeText = {text => onLastNameChange(text)}
              returnKeyType = 'next'
              placeholder = ' Last Name'
              value = {lastName}
              style = {{height:40, width:300, marginBottom:10, borderWidth:2,borderColor:'#000'}}
          />
          <TextInput
              textContentType = 'telephoneNumber'
              keyboardType = 'phone-pad'
              onChangeText = {text => onPhoneNumberChange(text)}
              placeholder = ' Phone Number'
              value = {phoneNumber}
              style = {{height:40, width:300, marginBottom:10, borderWidth:2,borderColor:'#000'}}
          />
          <Text>{alertText}</Text>
          <TouchableOpacity style = {styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonTitle}>Sign Up</Text>
          </TouchableOpacity>

          <Text>Alreacy have an account?</Text>

          <TouchableOpacity onPress={handleSignInNav}>
            <Text style={{fontSize: 20,color:Colors.all.ATGold}}>Sign In</Text>
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