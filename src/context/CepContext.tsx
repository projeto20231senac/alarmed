import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  children: React.ReactElement;
}

export interface ICep {
  cep: string;
}
export interface ICepContext {
  cep: ICep;
  // loadCep(cep: ICep): void;
}

const cepData = '@Alarmed/:cep';

export const CepContext = React.createContext<ICepContext>({} as ICepContext);

// export const CepProvider: React.FunctionComponent<IProps> = ({ children }) => {
//   const [cep, setCep] = React.useState<ICep>({} as ICep);
//   useEffect(() => {
//     async function loadCep(value: string) {
//       await AsyncStorage.setItem(cepData, value);
//     }
//     loadCep('cep');
//   }, []);
//   return <CepContext.Provider value={{ cep }}>{children}</CepContext.Provider>;
// };
