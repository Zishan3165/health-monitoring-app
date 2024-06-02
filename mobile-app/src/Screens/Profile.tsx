import React, { useContext } from 'react';
import {
   View,
   StyleSheet,
   SafeAreaView,
   ActivityIndicator,
} from 'react-native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Avatar, Caption, Title } from 'react-native-paper';
import { UserType } from '../Types';
import MyContext from '../store/context';

interface ProfilePageProps {
   navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
}
const Profile = ({ navigation }: ProfilePageProps) => {
   const { userDetails } = useContext(MyContext);

   if (!userDetails) {
      return <ActivityIndicator />;
   }

   const { email, fullName, id, phoneNumber, age } = userDetails;

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
               <Avatar.Image
                  style={styles.avatar}
                  source={{
                     uri:
                        'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
                  }}
                  size={80}
               />
               <View style={{ marginLeft: 20 }}>
                  <Title
                     style={[
                        styles.title,
                        {
                           marginTop: 15,
                           marginBottom: 5,
                        },
                     ]}
                  >
                     {fullName}
                  </Title>
                  <Caption style={styles.caption}>{email}</Caption>
               </View>
            </View>
            <View style={styles.horizontalLine} />
            <View style={{ flexDirection: 'row', marginTop: 60 }}>
               <Caption style={styles.details}>Name : </Caption>
               <Caption style={styles.details}>{fullName}</Caption>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
               <Caption style={styles.details}>ID : </Caption>
               <Caption style={styles.details}>{id}</Caption>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
               <Caption style={styles.details}>Email : </Caption>
               <Caption style={styles.details}>{email}</Caption>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
               <Caption style={styles.details}>Phone : </Caption>
               <Caption style={styles.details}>{phoneNumber}</Caption>
            </View>
            {userDetails.type == UserType.PATIENT && (
               <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <Caption style={styles.details}>Age : </Caption>
                  <Caption style={styles.details}>{age}</Caption>
               </View>
            )}
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   horizontalLine: {
      backgroundColor: '#A2A2A2',
      height: 2,
      marginTop: 20,
   },
   container: {
      flexDirection: 'row',
      marginTop: 15,
      marginBottom: 15,
      justifyContent: 'center',
   },
   userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
   },
   caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
   },
   details: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '700',
   },
   row: {
      flexDirection: 'row',
      marginBottom: 10,
   },
   avatar: {
      backgroundColor: '#3A9E984A',
   },
   nameSection: {
      marginLeft: 45,
   },
});

export default Profile;
