import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Amplify, I18n} from 'aws-amplify';
import awsConfig from './aws-exports';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

Amplify.configure(awsConfig);

//const MyContainer = Object.assign({}, AmplifyTheme.container, { marginTop: statusBarHeight});

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default App;