import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Avatar, Title, Caption, ActivityIndicator } from 'react-native-paper';
import { RootStackParamList } from '../../../App';
import MyContext from '../../store/context';
import { HealthLog } from '../../Types';
import HealthLogItem from './HealthLogItem';
import firestore from '@react-native-firebase/firestore';

export type HealthLogProps = NativeStackScreenProps<
   RootStackParamList,
   'HealthLog'
>;

const HealthLogPage = ({ navigation, route }: HealthLogProps) => {
   const { userDetails: userDetailsFromContext } = useContext(MyContext);
   console.log(route);
   const { userDetails: userDetailsFromParams } = route?.params || {};
   const [healthLogList, setHealthLogList] = useState<HealthLog[]>();

   let userDetailsToRender = userDetailsFromContext;
   if (userDetailsFromParams) {
      userDetailsToRender = userDetailsFromParams;
   }

   useEffect(() => {
      const subscriber = firestore()
         .collection('HealthLog')
         .where('patientId', '==', userDetailsToRender?.id)
         // .orderBy('timestamp', 'desc')
         .onSnapshot(querySnapshot => {
            let healthLogList = [] as HealthLog[];
            console.log(querySnapshot);
            querySnapshot?.forEach(documentSnapshot => {
               healthLogList.push(documentSnapshot.data() as HealthLog);
            });
            healthLogList = healthLogList.sort(
               (a, b) => b.timestamp - a.timestamp,
            );
            setHealthLogList(healthLogList);
         });

      // Unsubscribe from events when no longer in use
      return () => subscriber();
   }, [userDetailsToRender]);

   if (!userDetailsToRender || !healthLogList) {
      return <ActivityIndicator style={{ flex: 1 }} />;
   }
   const { fullName, age, email } = userDetailsToRender;
   return (
      <View style={{ flex: 1 }}>
         <View
            style={{
               flexDirection: 'row',
               alignContent: 'center',
               marginTop: 15,
               marginBottom: 15,
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
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
               <Caption style={styles.caption}>Age : {age} </Caption>
            </View>
         </View>
         <View style={{ flex: 1 }}>
            <FlatList
               style={{ marginTop: 0, padding: 5, flex: 1 }}
               data={healthLogList}
               renderItem={({ item, index, separators }) => (
                  <HealthLogItem key={item.id} healthLog={item} />
               )}
               keyExtractor={(item: HealthLog) => `${item.timestamp}`}
               scrollToOverflowEnabled
               scrollEnabled
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
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
   imageContainerView: {
      justifyContent: 'center',
      paddingBottom: 20,
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

export default HealthLogPage;
