import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  children: React.ReactElement;
}

export interface IUsuario {
 cpf:string,
 cep:string,
 dtNascimento:number
}
export interface IAlarme {
  cpf:string,
  alarme_nome:string,
  alarme_recorrencia:string,
  alarme_foto:string
 }
export interface IAlarmeContext {
  alarme: IAlarme[];
  alarme_nome:string;
  adicionarAlarme():void
}


export const AlarmeContext = React.createContext<IAlarmeContext>({} as IAlarmeContext);

export const AlarmeProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [data,setData] = React.useState<IAlarme[]>([]);
  
  const adicionarAlarme= async (nomeMedicamento:IAlarme)=>{
    try {
      const novoAlarme =[...data,nomeMedicamento]
     setData(novoAlarme)
    } catch (error) {
      console.log("error",error);
    }
  }
  
  return (
    <AlarmeContext.Provider value={{adicionarAlarme,alarme:data}}>
      {children}
    </AlarmeContext.Provider>
  )
}
