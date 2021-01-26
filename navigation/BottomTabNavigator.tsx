import {FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProfileScreen from '../screens/tabs/profile/ProfileScreen';
import DashboardScreen from '../screens/tabs/dashboard/DashboardScreen';
import InventoryScreen from '../screens/tabs/inventory/InventoryScreen';
import SettingsScreen from '../screens/tabs/profile/SettingsScreen';
import PreferencesScreen from '../screens/tabs/profile/PreferencesScreen';
import DocumentsScreen from '../screens/tabs/profile/DocumentsScreen';

import Icon from '../CustomIcon';

import { BottomTabParamList, ProfileParamList, DashboardParamList, InventoryParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();


export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].activeTab, 
        inactiveTintColor:Colors[colorScheme].inactiveTab, 
        activeBackgroundColor:Colors[colorScheme].activeBackground,
        inactiveBackgroundColor:Colors[colorScheme].inactiveBackground,
        showLabel:false }}> 
      
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{
          tabBarIcon: ({ color }) => <CustomIcon name = "autoTailorsLogo" color = {color}/>,
        }}
      />
      <BottomTab.Screen
        name="Inventory"
        component={InventoryNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon name="car" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component = {ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon name="user-circle" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function CustomIcon(props: { name: string; color: string }) {
  return <Icon size={35} style={{ marginBottom: -3 }} {...props} />;
}
function FontAwesomeIcon(props:{name:string; color:string}){
  return <FontAwesome5 size = {35} style ={{marginBottom: -3}}{...props}/>;
}

function LogoTitle() {
  return (
    <Icon name ="autoTailorsLogo" size={80} style={{ marginBottom: -3 }}/>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab8

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator(){
  const colorScheme = useColorScheme();
  return(
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        name = "ProfileScreen"
        component = {ProfileScreen}
        options = {{headerTitleAlign: "center", headerTitle: props => <LogoTitle {...props}/>,headerStyle:{borderBottomWidth:0,shadowRadius:0,shadowColor:"#fff", elevation: 0,shadowOpacity:0} } }
        />
      <ProfileStack.Screen
        name = "SettingsScreen"
        component = {SettingsScreen}
        options = {{headerTitleAlign: "center", headerTitle: props => <LogoTitle {...props}/>,headerStyle:{borderBottomWidth:0,shadowRadius:0,shadowColor:"#fff", elevation: 0,shadowOpacity:0} } }
        />
      <ProfileStack.Screen
        name = "PreferencesScreen"
        component = {PreferencesScreen}
        options = {{headerTitleAlign: "center", headerTitle: props => <LogoTitle {...props}/>,headerStyle:{borderBottomWidth:0,shadowRadius:0,shadowColor:"#fff", elevation: 0,shadowOpacity:0} } }
      />
      <ProfileStack.Screen
        name = "DocumentsScreen"
        component = {DocumentsScreen}
        options = {{headerTitleAlign: "center", headerTitle: props => <LogoTitle {...props}/>,headerStyle:{borderBottomWidth:0,shadowRadius:0,shadowColor:"#fff", elevation: 0,shadowOpacity:0} } }
      />
        
    </ProfileStack.Navigator>
  );

}

const DashboardStack = createStackNavigator<DashboardParamList>();

function DashboardNavigator() {
  const colorScheme = useColorScheme();
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options = {{headerTitleAlign: "center", headerTitle:"Dashboard"} }
      />
    </DashboardStack.Navigator>
  );
}

const InventoryStack = createStackNavigator<InventoryParamList>();

function InventoryNavigator() {
  const colorScheme = useColorScheme();
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen
        name="InventoryScreen"
        component={InventoryScreen}
        options = {{headerTitleAlign: "center", headerTitle:"Inventory"}}
      />
    </InventoryStack.Navigator>
  );
}
