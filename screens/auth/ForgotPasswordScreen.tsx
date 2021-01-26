import * as SecureStore from 'expo-secure-store';
import React, {useState} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {View,TouchableOpacity,StyleSheet,TextInput,Text} from 'react-native';  
import Colors from '../../constants/Colors';
import Constants from 'expo-constants';
import {Auth, auth0SignInButton} from 'aws-amplify';
import {Amplify} from 'aws-amplify';
import Icon from '../../CustomIcon';
import useColorScheme from '../../hooks/useColorScheme';
import awsConfig from '../../aws-exports';


Amplify.configure(awsConfig);

async function resendConfirmationCode() {
  try {
    const username = await SecureStore.getItemAsync('username').catch((error)=>error);
    console.log('username is ' + username);
    await Auth.resendSignUp(username);
    console.log('code resent successfully');
  } catch (err) {
    console.log('error resending code: ', err);
  }
}

export default function Verification({navigation}) {
  const [confirmCode,onCodeChange] = useState('');
  const [newPassword, onNewPasswordChange] = useState('');
  const [confirmPassword, onConfirmPasswordChange] = useState('');
  const [email, onEmailChange] = useState('');
  const [alertText, setAlertText] = useState('');
  const [confirmAlertText, setConfirmAlertText] = useState('');

//   async function fetchUsername(){
//     try{
//         setUsername(await SecureStore.getItemAsync('username').catch((error) => error));
//         console.log('username set to '+ username);
//     }
//     catch(error){
//         setUsername('');
//         console.log(error)
//     }
//     return 
//   }
//   async function confirmSignUp(){
//     fetchUsername();
//     if (username != ''){
//         try{
//             await Auth.confirmSignUp(username,confirmCode);
//             navigation.replace('Root');
    
//         }
//         catch(error){
//           console.log('Error confirming signup: ' + error);
//         }
//     }
//     else{
//         console.log('Failed to fetch username')
//     }
//   }


  const colorScheme = useColorScheme();

  function sendConfirmCode(){
    Auth.forgotPassword(email)
    .then(() => setConfirmAlertText('Confirmation Code Sent'))
    .catch(err => console.log(err));
  }

  async function changePasswordSubmit(){
    if (newPassword == confirmPassword && email != ''){
        try{
            await Auth.forgotPasswordSubmit(email, confirmCode, newPassword);
            navigation.navigate('Login');
            console.log('Password change successful.');
        }
        catch (error){
            if(error.code == 'LimitExceededException'){
                setAlertText('Too many attempts.  Please wait');
            }
            console.log('Password change failed');
        }
        
        
    }
    else{
        setAlertText('Passwords do not match.');
    }
  }

  function handleLoginNav(){
      navigation.navigate('Login');
  }


  return (

    <View style= {styles.background}>
      <View style = {styles.container}>
        <Icon size ={200} name = 'autoTailorsLogo' style={{marginBottom:20}} />
        <TextInput
            placeholder = ' Email'
            value = {email}
            onChangeText = {text => onEmailChange(text)}
            style = {{height:40, marginBottom:10, width:300, borderWidth:2,borderColor:'#000'}}
        />

        <TouchableOpacity style = {styles.button} onPress={sendConfirmCode}>
            <Text style={styles.buttonTitle}>Send Confirmation Code</Text>
        </TouchableOpacity>

        <Text>{confirmAlertText}</Text>

        <Text style = {{marginVertical:20}}>Please enter the verification code that was sent to the email you provided.</Text>
        <TextInput 
            keyboardType = "number-pad"
            placeholder = ' 6-Digit Confirmation Code'
            value = {confirmCode}
            onChangeText = {text => onCodeChange(text)}
            style = {{height:40, marginBottom:10, width:300, borderWidth:2,borderColor:'#000'}}
        />

        <TextInput
            placeholder = " New Password"
            value = {newPassword}
            onChangeText = {text => onNewPasswordChange(text)}
            style = {{height:40, marginBottom:10, width:300, borderWidth:2,borderColor:'#000'}}
            secureTextEntry = {true}
        />
        <TextInput
            placeholder = ' Confirm New Password'
            secureTextEntry = {true}
            value = {confirmPassword}
            onChangeText = {text => onConfirmPasswordChange(text)}
            style = {{height:40, marginBottom:10, width:300, borderWidth:2,borderColor:'#000'}}
        />
        <TouchableOpacity style = {styles.button} onPress={changePasswordSubmit}>
            <Text style={styles.buttonTitle}>Change Password</Text>
        </TouchableOpacity>
        <Text style={{fontSize:10, color:'red', marginVertical:20}}>{alertText}</Text>

        <TouchableOpacity style = {{marginVertical: 15}} onPress = {handleLoginNav}>
            <Text style ={{fontSize: 15, color:Colors.all.ATGold}}>Return To Login</Text>
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