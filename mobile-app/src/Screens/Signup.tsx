import React, { useContext, useState } from 'react';
import {
   TextInput,
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   ActivityIndicator,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { User, UserType } from '../Types';
import Toast from 'react-native-root-toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MyContext from '../store/context';
import { requestUserPermissionAndFetchToken } from '../helpers/pushNotificationHelper';

const ASSIGNED_DOCTOR_ID = 'etL6fQK069YNSPEWiYkSvEepSbH3';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default ({ navigation }: SignupProps) => {
   const [fullName, setFullName] = useState('');
   const [email, setEmail] = useState('');
   const [userType, setUserType] = useState<UserType>(UserType.PATIENT);
   const [phoneNumber, setPhoneNumber] = useState('');
   const [password, setPassword] = useState('');
   const [age, setAge] = useState<number>();
   const [loading, setLoading] = useState(false);
   const { saveUserDetails } = useContext(MyContext);

   const handleSubmit = async () => {
      setLoading(true);
      try {
         const authResponse = await auth().createUserWithEmailAndPassword(
            email,
            password,
         );
         const userObj: User = {
            fullName,
            email,
            type: userType,
            phoneNumber,
            age,
            id: authResponse.user.uid,
            assignedDoctorId: ASSIGNED_DOCTOR_ID,
         };
         if (userType === UserType.DOCTOR) {
            delete userObj.age;
            delete userObj.assignedDoctorId;
         }
         const token = await requestUserPermissionAndFetchToken();
         if (token) {
            userObj.deviceIdToken = token;
         }
         console.log('User account created & signed in!');
         await firestore()
            .collection('Users')
            .doc(userObj.id)
            .set(userObj);

         console.log('User added!');
         saveUserDetails(userObj);
      } catch (e) {
         console.log(e);
         Toast.show('Signup failed!', {
            duration: Toast.durations.SHORT,
         });
      } finally {
         setLoading(false);
      }
   };

   const disabled =
      !fullName ||
      !email ||
      !password ||
      (!age && userType === UserType.PATIENT) ||
      loading;

   return (
      <View style={styles.container}>
         <View>
            <Text style={styles.titleTextStyle}>Sign Up</Text>
         </View>
         <TextInput
            value={fullName}
            style={styles.input}
            placeholder="Full Name"
            autoCapitalize="none"
            placeholderTextColor="white"
            returnKeyType="done"
            onChangeText={setFullName}
         />
         <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={setEmail}
            returnKeyType="done"
         />
         <TextInput
            value={password}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="white"
            returnKeyType="done"
            keyboardType="default"
            onChangeText={setPassword}
         />
         <TextInput
            value={phoneNumber}
            style={styles.input}
            placeholder="Phone Number"
            autoCapitalize="none"
            placeholderTextColor="white"
            keyboardType="phone-pad"
            returnKeyType="done"
            onChangeText={setPhoneNumber}
         />
         {userType === UserType.PATIENT && (
            <TextInput
               value={!!age ? `${age}` : undefined}
               style={styles.input}
               placeholder="Age"
               autoCapitalize="none"
               placeholderTextColor="white"
               keyboardType="number-pad"
               returnKeyType="done"
               onChangeText={value => setAge(Number(value))}
               textContentType="telephoneNumber"
            />
         )}
         <View
            style={{
               display: 'flex',
               flexDirection: 'row',
               alignItems: 'center',
            }}
         >
            <RadioButton
               value="first"
               status={userType === UserType.DOCTOR ? 'checked' : 'unchecked'}
               onPress={() => setUserType(UserType.DOCTOR)}
            />
            <Text>Doctor</Text>
            <RadioButton
               value="second"
               status={userType === UserType.PATIENT ? 'checked' : 'unchecked'}
               onPress={() => setUserType(UserType.PATIENT)}
            />
            <Text>Patient</Text>
         </View>
         <View style={styles.spaceBetweenButton}></View>
         <TouchableOpacity
            onPress={handleSubmit}
            disabled={disabled}
            style={{ ...styles.signUpButtonStyle, opacity: disabled ? 0.2 : 1 }}
         >
            <Text style={styles.buttonTextStyle}>
               {loading ? <ActivityIndicator /> : `SIGNUP`}
            </Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   input: {
      width: 350,
      height: 55,
      backgroundColor: '#4db6ac',
      margin: 10,
      padding: 8,
      color: 'white',
      borderRadius: 14,
      fontSize: 18,
      fontWeight: '500',
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   titleTextStyle: {
      fontSize: 18,
      alignItems: 'center',
      fontWeight: 'bold',
      justifyContent: 'center',
      paddingBottom: 20,
   },
   signUpButtonStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: '#394F51',
      paddingBottom: 10,
      paddingTop: 10,
      height: 40,
      width: 200,
   },
   buttonTextStyle: {
      fontWeight: 'bold',
      fontSize: 14,
      color: 'white',
   },
   spaceBetweenButton: {
      width: 20,
      height: 20,
   },
});
