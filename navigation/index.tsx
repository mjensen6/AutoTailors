import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View} from 'react-native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import VerificationScreen from '../screens/auth/VerificationScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import { RootStackParamList } from '../types';
import LoginScreen from '../screens/auth/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const AppStack = createStackNavigator<RootStackParamList>();


function RootNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name ="Login" component = {LoginScreen}/>
      <AppStack.Screen name ="Signup" component = {SignupScreen}/>
      <AppStack.Screen name ="Verification" component = {VerificationScreen} />
      <AppStack.Screen name = "ForgotPassword" component = {ForgotPasswordScreen}/>
      <AppStack.Screen name="Root" component={BottomTabNavigator} />
      <AppStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </AppStack.Navigator>
  );
}
