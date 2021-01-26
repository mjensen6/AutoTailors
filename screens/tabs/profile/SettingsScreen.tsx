import * as React from 'react';
import { StyleSheet,Button,Image,TouchableOpacity ,ScrollView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import { BottomTabParamList, ProfileParamList, DashboardParamList, InventoryParamList } from '../../../types';


import { Text, View } from '../../../components/Themed';
import { Auth } from 'aws-amplify';
import { TextInput } from 'react-native';


function dummy(){

}

export default function SettingsScreen(){
  const [editMode, setEditMode] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const[phoneNumber, setPhoneNumber] = React.useState('');
  const [editSaveText, setEditSaveText] = React.useState('Edit');

  async function getUserInfo(){
    try{
      const user = await Auth.currentUserInfo();
      setFirstName(user.attributes['custom:firstName']);
      setLastName(user.attributes['custom:lastName']);
      setEmail(user.attributes.email);
      setPhoneNumber(user.attributes['custom:phoneNumber']);
    }
    catch(error){
      console.log(error);
    }
  }

  function handleEditClick(){
    setEditMode(!editMode);
    if (editMode){
      setEditSaveText('Edit');
    }else{
      setEditSaveText('Save');
    }
    
    
  }
  getUserInfo();

  function handleSubmit(){

  }
  const colorScheme = useColorScheme();
  return(
      <ScrollView stickyHeaderIndices = {[0]} contentContainerStyle = {styles.container}>
        <View style={styles.separatorFixed} lightColor={Colors.all.ATGold} darkColor={Colors.all.ATGold} />
        <Text style={styles.title}>Settings</Text>
        <View style={styles.separator} lightColor={Colors.all.ATGold} darkColor={Colors.all.ATGold} />
        <TextInput
          editable ={editMode}
          placeholder = {firstName}
          value = {firstName}
          onChangeText = {text => setFirstName(text)}
          style = {{height:40, marginBottom:10, width:300, borderWidth:2,borderColor:'#000'}}
        />
        <TextInput
          editable ={editMode}
          placeholder = {lastName}
          value = {lastName}
          onChangeText = {text => setLastName(text)}
          style = {{height:40, marginBottom:10, width:300, borderWidth:2,borderColor:'#000'}}
        />
        <TextInput
          editable ={editMode}
          placeholder = {phoneNumber}
          value = {phoneNumber}
          onChangeText = {text => setPhoneNumber(text)}
          style = {{height:40, marginBottom:10, width:300, borderWidth:2,borderColor:'#000'}}
        />
        <TouchableOpacity onPress = {handleEditClick}>
          <Text  style = {{fontSize:15, color:Colors.all.ATGold}}>{editSaveText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress = {handleSubmit}>
          <Text style={styles.buttonTitle}>Update Settings</Text>
        </TouchableOpacity>
        <View style={styles.separator} lightColor={Colors.all.ATGold} darkColor={Colors.all.ATGold} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
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