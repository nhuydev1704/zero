import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {setNavigationRef} from './src/utils/navigationUtils';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import MainStack from './src/navigation/MainStack';
import {LogBox, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar translucent backgroundColor="transparent" />

        <NavigationContainer ref={setNavigationRef}>
          <StatusBar translucent backgroundColor="transparent" />

          <MainStack />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
