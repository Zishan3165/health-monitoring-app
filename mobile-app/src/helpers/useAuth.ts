import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuth() {
   const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

   async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
      setUser(user);
      if (!user) {
         AsyncStorage.removeItem('userDetails');
      }
   }

   useEffect(() => {
      const getUserDetailsFromStorage = async () => {
         const userDetails = await AsyncStorage.getItem('userDetails');
         if (!userDetails) {
            setUser(null);
         }
      };
      getUserDetailsFromStorage();
   }, []);

   useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
   }, []);

   return {
      user,
   };
}
