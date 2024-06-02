import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../Types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

interface PatientItemProps {
   patient: User;
}
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Doctor'>;
const PatientItem = ({ patient }: PatientItemProps) => {
   const { fullName, age, phoneNumber, email, id } = patient;
   const navigation = useNavigation<NavigationProps>();
   return (
      <Pressable
         onPress={() =>
            navigation.navigate('HealthLog', { userDetails: patient })
         }
      >
         <View
            style={{
               backgroundColor: '#3A9E984A',
               height: 125,
               width: '90%',
               marginLeft: 'auto',
               marginRight: 'auto',
               borderRadius: 10,
               padding: 10,
               marginBottom: 10,
            }}
         >
            <Text>Name : {fullName}</Text>
            <Text>ID : {id}</Text>
            <Text>Age : {age}</Text>
            <Text>Phone : {phoneNumber}</Text>
            <Text>Email : {email}</Text>
         </View>
      </Pressable>
   );
};

export default PatientItem;
