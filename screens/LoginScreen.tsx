import React, { useState,useRef } from 'react';
import {View,Button,StyleSheet,TextInput,Text} from 'react-native';  
import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import {Auth} from 'aws-amplify';



export default function Login() {

    const [email,onEmailChange] = useState('');
    const [password, onPasswordChange] = useState('');
    function handleSubmit(){
        console.log(email);
        console.log(password);   
    }

  return (
    <View style= {styles.background}>
        <View style = {styles.container}>
            <Text>Email</Text>
            <TextInput
                onChangeText = {text => onEmailChange(text)}
                value = {email}
                style = {{height:30, width:100, borderWidth:3,borderColor:'#000'}}
            />
            <Text>Password</Text>
            <TextInput
                onChangeText = {text => onPasswordChange(text)}
                secureTextEntry = {true}
                value = {password}
                style = {{height:30, width:100, borderWidth:3,borderColor:'#000'}}
            />
            <Button
                title="Sign Up!"
                onPress={handleSubmit}
            />
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