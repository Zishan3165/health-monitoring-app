import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItem,
   DrawerItemList,
} from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { RootStackParamList } from '../../../App';
import HealthLogPage from '../HealthLogPage';
import Profile from '../Profile';
import MyContext from '../../store/context';

type PatientPageProps = NativeStackScreenProps<RootStackParamList, 'Patient'>;

const PatientHomePage = ({ navigation }: PatientPageProps) => {
   const Drawer = createDrawerNavigator<RootStackParamList>();
   const { removeUserDetails } = useContext(MyContext);

   // const createAlarmNewAlarm = async () => {
   //    try {
   //       await createAlarm({
   //          active: false,
   //          date: new Date().toISOString(),
   //          message: 'message',
   //          snooze: 1,
   //       });
   //    } catch (e) {}
   // };

   // useEffect(() => {
   //    createAlarmNewAlarm();
   // }, []);
   return (
      <Drawer.Navigator
         initialRouteName="HealthLog"
         drawerContent={props => {
            return (
               <DrawerContentScrollView {...props}>
                  <DrawerItemList {...props} />
                  <DrawerItem
                     label="Logout"
                     onPress={async () => removeUserDetails()}
                  />
               </DrawerContentScrollView>
            );
         }}
      >
         <Drawer.Screen
            name="HealthLog"
            component={HealthLogPage}
            options={{ title: 'Health Log' }}
         />
         <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{ title: 'Profile' }}
         />
      </Drawer.Navigator>
   );
};

export default PatientHomePage;
