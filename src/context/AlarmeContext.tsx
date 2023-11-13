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
 export interface IHorario{
  cpf:string,
  medicamentos_id:string,
  alarme_id:string,
  hora:string
 }
export interface IAlarmeContext {
  alarme: IAlarme[];
  horario:IHorario[];
  adicionarAlarme():void
}


export const AlarmeContext = React.createContext<IAlarmeContext>({} as IAlarmeContext);

export const AlarmeProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [data,setData] = useState<IAlarme[]>([]);
  const [horario,setHorarios] = useState([])

  const adicionarHorario = async (h)=>{
    try{
      const horarios = [...horario,h]
      setHorarios(horarios)
    }catch (error) {
      console.log("error",error);
    }
  }
  const adicionarAlarme= async (nomeMedicamento:IAlarme)=>{
    try {
      const novoAlarme =[...data,nomeMedicamento]
     setData(novoAlarme)
    } catch (error) {
      console.log("error",error);
    }
  }
  console.log("horarios",horario);
  
  
  return (
    <AlarmeContext.Provider value={{alarme:data, adicionarAlarme,adicionarHorario,horario:horario}}>
      {children}
    </AlarmeContext.Provider>
  )
}
