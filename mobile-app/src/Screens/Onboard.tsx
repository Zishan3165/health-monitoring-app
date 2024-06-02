import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { RootStackParamList } from '../../App';

type OnboardProps = NativeStackScreenProps<RootStackParamList, 'Onboard'>;

const Onboard = ({ navigation }: OnboardProps) => {
   return (
      <View style={styles.container}>
         <View style={styles.buttonStyling}>
            <Pressable onPress={() => navigation.navigate('Signup')}>
               <Text style={styles.buttonTextStyle}>SIGN UP</Text>
            </Pressable>
         </View>
         <View style={styles.spaceBetweenButton} />
         <View style={styles.buttonStyling}>
            <Pressable onPress={() => navigation.navigate('Login')}>
               <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </Pressable>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   imageContainerView: {
      justifyContent: 'center',
      paddingBottom: 20,
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   buttonStyling: {
      alignItems: 'center',
      backgroundColor: '#394F51',
      justifyContent: 'center',
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
   titleTextStyle: {
      height: 100,
      width: 180,
      fontSize: 18,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default Onboard;
