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
  const [username, setUsername] = useState('');

  async function fetchUsername(){
    try{
      const data = await SecureStore.getItemAsync('username').catch((error) => error)
      setUsername(data);
      console.log('username set to '+ username);
    }
    catch(error){
        setUsername('');
        console.log(error)
    }
    return 
  }

  async function confirmSignUp(){
    fetchUsername();
    if (username != ''){
        try{
            await Auth.confirmSignUp(username,confirmCode);
            navigation.replace('Root');
    
        }
        catch(error){
          console.log('Error confirming signup: ' + error);
        }
    }
    else{
        console.log('Failed to fetch username')
    }
  }

  const colorScheme = useColorScheme();


  return (

    <View style= {styles.background}>
      <View style = {styles.container}>
          <Icon size ={200} name = 'autoTailorsLogo' style={{marginBottom:20}} />
          <Text style = {{marginVertical:20}}>Please enter the verification code that was sent to the email you provided.</Text>
          <TextInput 
            keyboardType = "number-pad"
            value = {confirmCode}
            onChangeText = {text => onCodeChange(text)}
            style = {{height:40, marginBottom:10, width:300, borderWidth:2,borderColor:'#000'}}
          />
          <TouchableOpacity style = {styles.button} onPress={confirmSignUp}>
            <Text style={styles.buttonTitle}>Confirm Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {{marginVertical:20}} onPress = {resendConfirmationCode}>
            <Text style={{color:Colors.all.ATGold, fontSize:30}}>Resend Confirmation</Text>
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