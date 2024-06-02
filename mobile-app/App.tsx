import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { Provider } from './src/store/provider';
import AppRouter from './AppRouter';
import { User } from './src/Types';

export type RootStackParamList = {
   Onboard: undefined;
   Login: undefined;
   Signup: undefined;
   Doctor: undefined;
   Patient: undefined;
   MyPatients: undefined;
   Profile: undefined;
   HealthLog: { userDetails?: User };
};

const App = () => {
   useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
         const { notification } = remoteMessage;

         Alert.alert(
            notification?.title || 'New notification',
            notification?.body || '',
         );
      });

      return unsubscribe;
   }, []);

   return (
      <Provider>
         <AppRouter />
      </Provider>
   );
};

export default App;
