import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { PropsWithChildren, useState, useEffect } from 'react';
import { User } from '../Types';
import MyContext from './context';

export const Provider = (props: PropsWithChildren) => {
   const [userDetails, setUserDetails] = useState<User | null>(null);

   useEffect(() => {
      const initializeFromStorage = async () => {
         try {
            const userDetailsString = await AsyncStorage.getItem('userDetails');
            if (userDetailsString) {
               setUserDetails(JSON.parse(userDetailsString) as User);
            }
         } catch (e) {
            await AsyncStorage.removeItem('userDetails');
            setUserDetails(null);
         }
      };
      initializeFromStorage();
   }, []);

   return (
      <MyContext.Provider
         value={{
            userDetails,
            saveUserDetails: async (userDetails: User) => {
               await AsyncStorage.setItem(
                  'userDetails',
                  JSON.stringify(userDetails),
               );
               setUserDetails(userDetails);
            },
            removeUserDetails: async () => {
               await AsyncStorage.removeItem('userDetails');
               setUserDetails(null);
            },
         }}
      >
         {props.children}
      </MyContext.Provider>
   );
};
