import * as React from 'react';
import { StyleSheet,Button,Image,TouchableOpacity ,ScrollView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { BottomTabParamList, ProfileParamList, DashboardParamList, InventoryParamList } from '../types';
import DashboardScreen from '../screens/DashboardScreen';
import Icon from '../CustomIcon';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
function dummy(){

}



export default function ProfileScreen({navigation}){
    const colorScheme = useColorScheme();
    return(
      
      <ScrollView stickyHeaderIndices = {[0]} contentContainerStyle = {styles.container}>
        <View style={styles.separatorFixed} lightColor={Colors.all.ATGold} darkColor={Colors.all.ATGold} />
        <Text style={styles.title}>Client Profile</Text>
        <View style={styles.separator} lightColor={Colors.all.ATGold} darkColor={Colors.all.ATGold} />
        <TouchableOpacity style = {styles.button} onPress = {() => navigation.navigate('PreferencesScreen')}>
          <Text style = {styles.buttonTitle}>Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.button} onPress = {() => navigation.navigate('DocumentsScreen')}>
          <Text style = {styles.buttonTitle}>Documents</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.button} onPress = {() => navigation.navigate('SettingsScreen')}>
          <Text style = {styles.buttonTitle}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.button} onPress = {signOut}>
          <Text style = {styles.buttonTitle}>Sign Out</Text>
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