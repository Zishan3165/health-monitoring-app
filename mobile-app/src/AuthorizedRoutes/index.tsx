import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorHomePage from '../Screens/Doctor';
import HealthLogPage from '../Screens/HealthLogPage';
import PatientHomePage from '../Screens/Patient';
import { User, UserType } from '../Types';
import { ActivityIndicator } from 'react-native-paper';

export type AuthorizedStackParamList = {
   Doctor: undefined;
   Patient: undefined;
   MyPatients: undefined;
   Profile: undefined;
   HealthLog: undefined;
};

const Stack = createNativeStackNavigator<AuthorizedStackParamList>();

interface Props {
   userDetails: User | null;
}

const AuthorizedRoutes = ({ userDetails }: Props) => {
   if (!userDetails) {
      return <ActivityIndicator style={{ flex: 1 }} />;
   }
   return (
      <Stack.Navigator
         initialRouteName={
            userDetails.type === UserType.DOCTOR ? 'Doctor' : 'Patient'
         }
      >
         <Stack.Screen name="Doctor" component={DoctorHomePage} />
         <Stack.Screen name="HealthLog" component={HealthLogPage} />
         <Stack.Screen name="Patient" component={PatientHomePage} />
      </Stack.Navigator>
   );
};

export default AuthorizedRoutes;
