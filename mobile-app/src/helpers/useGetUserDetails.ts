import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../Types';

export function useGetUserDetails(user: FirebaseAuthTypes.User | null) {
   const [userDetails, setUserDetails] = useState<User | null>(null);

   useEffect(() => {
      const getUserDetailsFromStorage = async () => {
         const userDetails = await AsyncStorage.getItem('userDetails');
         console.log('go in user details ', userDetails);
         if (userDetails) {
            setUserDetails(JSON.parse(userDetails));
         } else {
            setUserDetails(null);
         }
      };
      getUserDetailsFromStorage();
   }, [user]);

   return {
      userDetails,
   };
}
