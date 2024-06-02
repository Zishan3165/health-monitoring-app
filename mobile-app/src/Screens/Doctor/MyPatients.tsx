import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../../../App';
import { User } from '../../Types';
import PatientItem from './PatientItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MyContext from '../../store/context';
import firestore from '@react-native-firebase/firestore';

interface MyPatientsPageProps {
   navigation: NativeStackNavigationProp<RootStackParamList, 'MyPatients'>;
}

const MyPatients = ({ navigation }: MyPatientsPageProps) => {
   const [patientList, setPatientList] = useState<User[]>();
   const { userDetails } = useContext(MyContext);

   useEffect(() => {
      const subscriber = firestore()
         .collection('Users')
         .where('assignedDoctorId', '==', userDetails?.id)
         .onSnapshot(querySnapshot => {
            const patientList = [] as User[];
            querySnapshot.forEach(documentSnapshot => {
               patientList.push(documentSnapshot.data() as User);
            });
            setPatientList(patientList);
         });

      // Unsubscribe from events when no longer in use
      return () => subscriber();
   }, []);

   if (!patientList) {
      return (
         <ActivityIndicator
            size="large"
            style={{
               margin: 10,
               flex: 1,
            }}
         />
      );
   }

   return (
      <View style={styles.container}>
         <FlatList
            style={{ marginTop: 0, padding: 5 }}
            data={patientList}
            renderItem={({ item, index, separators }) => (
               <PatientItem key={item.id} patient={item} />
            )}
            keyExtractor={(item: User) => item.id}
            scrollToOverflowEnabled
            scrollEnabled
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   },
});

export default MyPatients;
