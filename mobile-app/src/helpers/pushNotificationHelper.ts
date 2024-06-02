import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestUserPermissionAndFetchToken = async () => {
   const authStatus = await messaging().requestPermission();
   const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

   if (enabled) {
      console.log('Authorization status:', authStatus);
      return getFCMToken();
   }
};

export const getFCMToken = async () => {
   let fcmToken = await AsyncStorage.getItem('fcmToken');
   if (!fcmToken) {
      try {
         fcmToken = await messaging().getToken();
         if (fcmToken) {
            console.log(fcmToken);
            return fcmToken;
            // AsyncStorage.setItem('fcmToken', fcmToken);
         }
      } catch (error) {
         console.log(error, 'error in fcmToken');
      }
   }
};
