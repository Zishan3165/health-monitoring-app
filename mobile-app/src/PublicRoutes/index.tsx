import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Onboard from '../Screens/Onboard';
import Signup from '../Screens/Signup';

export type PublicStackParamList = {
   Onboard: undefined;
   Login: undefined;
   Signup: undefined;
};

const Stack = createNativeStackNavigator<PublicStackParamList>();

const PublicRoutes = () => {
   return (
      <Stack.Navigator initialRouteName="Onboard">
         <Stack.Screen name="Onboard" component={Onboard} />
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
   );
};

export default PublicRoutes;
