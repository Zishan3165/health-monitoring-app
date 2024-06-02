import React, { createContext } from 'react';
import { User } from '../Types';

interface ContextProps {
   userDetails: User | null;
   saveUserDetails: (userDetails: User) => void;
   removeUserDetails: () => void;
}

const MyContext = createContext<ContextProps>({} as ContextProps);

export default MyContext;
