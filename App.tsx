import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Amplify, I18n} from 'aws-amplify';
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native';

import awsConfig from './aws-exports';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

Amplify.configure(awsConfig);

// export the variables below to separate files
const authScreenLabels = {
  en: {
      'Sign in to your account':'Welcome to AutoTailors!'
  }
};
I18n.setLanguage('en');
I18n.putVocabularies(authScreenLabels);

const ATGold = '#d7be69'

//const MyContainer = Object.assign({}, AmplifyTheme.container, { marginTop: statusBarHeight});
const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, { });
const MySignInButton = Object.assign({},AmplifyTheme.button,{backgroundColor: ATGold });
const MyTheme = Object.assign({}, AmplifyTheme, { sectionHeader: MySectionHeader,button:MySignInButton });

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