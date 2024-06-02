import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import {
   TextInput,
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   ActivityIndicator,
} from 'react-native';
import { RootStackParamList } from '../../App';
import { User } from '../Types';
import Toast from 'react-native-root-toast';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { requestUserPermissionAndFetchToken } from '../helpers/pushNotificationHelper';
import MyContext from '../store/context';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default ({ navigation }: LoginProps) => {
   const [loading, setLoading] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { saveUserDetails } = useContext(MyContext);
   const handleLogin = async () => {
      setLoading(true);
      try {
         const userCredential = await auth().signInWithEmailAndPassword(
            email,
            password,
         );
         if (userCredential) {
            const token = await requestUserPermissionAndFetchToken();
            if (token) {
               await firestore()
                  .collection('Users')
                  .doc(userCredential.user.uid)
                  .update({ deviceIdToken: token });
            }
            const userDetailsResponse = await firestore()
               .collection('Users')
               .doc(userCredential.user.uid)
               .get();
            const userDetails = userDetailsResponse.data() as User;
            if (userDetails) {
               saveUserDetails(userDetails);
            } else {
               Toast.show('Login failed!', {
                  duration: Toast.durations.SHORT,
               });
            }
            console.log(userDetails);
         } else {
            Toast.show('Login failed!', {
               duration: Toast.durations.SHORT,
            });
         }
      } catch (e) {
         Toast.show('Login failed!', {
            duration: Toast.durations.SHORT,
         });
      } finally {
         setLoading(false);
      }
   };

   const disabled = !email || !password || loading;
   return (
      <View style={styles.container}>
         <TextInput
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
         <View style={styles.spaceBetweenButton}></View>
         <TouchableOpacity
            onPress={handleLogin}
            disabled={disabled}
            style={{ ...styles.logInButtonStyle, opacity: disabled ? 0.2 : 1 }}
         >
            <Text style={styles.buttonTextStyle}>
               {loading ? <ActivityIndicator /> : `LOGIN`}
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
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   logInButtonStyle: {
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
