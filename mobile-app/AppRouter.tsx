import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import AuthorizedRoutes from './src/AuthorizedRoutes';
import PublicRoutes from './src/PublicRoutes';
import MyContext from './src/store/context';

const AppRouter = () => {
   const { userDetails } = useContext(MyContext);

   return (
      <RootSiblingParent>
         <NavigationContainer>
            <StatusBar />
            {!!userDetails ? (
               <AuthorizedRoutes userDetails={userDetails} />
            ) : (
               <PublicRoutes />
            )}
         </NavigationContainer>
      </RootSiblingParent>
   );
};

export default AppRouter;
