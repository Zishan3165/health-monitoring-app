import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItem,
   DrawerItemList,
} from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { RootStackParamList } from '../../../App';
import Profile from '../Profile';
import MyPatients from './MyPatients';
import MyContext from '../../store/context';
// import { createAlarm } from 'react-native-simple-alarm';

type DoctorPageProps = NativeStackScreenProps<RootStackParamList, 'Doctor'>;

const DoctorHomePage = ({ navigation }: DoctorPageProps) => {
   const Drawer = createDrawerNavigator();
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

   useEffect(() => {
      // createAlarmNewAlarm();
   }, []);

   return (
      <Drawer.Navigator
         initialRouteName="MyPatients"
         drawerContent={props => {
            return (
               <DrawerContentScrollView {...props}>
                  <DrawerItemList {...props} />
                  <DrawerItem
                     label="Logout"
                     onPress={async () => {
                        removeUserDetails();
                     }}
                  />
               </DrawerContentScrollView>
            );
         }}
      >
         <Drawer.Screen
            name="MyPatients"
            component={MyPatients}
            options={{ title: 'My Patients' }}
         />
         <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{ title: 'Profile' }}
         />
      </Drawer.Navigator>
   );
};

export default DoctorHomePage;
