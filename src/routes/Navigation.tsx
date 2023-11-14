import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../components/Home';
import { Terms } from '../components/Terms';
// import { Cep } from '../components/Cep';
import { Cpf } from '../components/Cpf';
import { Nascimento } from '../components/DtNasc';
import { Alarmes } from '../components/Alarmes';
import { AlarmesNome } from '../components/AlarmesNome';
import { Edit } from '../components/Edit';
import { AlarmeDetails } from '../components/AlarmeDetails';
import AlarmesFoto from '../components/AlarmesFoto';
import { AlarmesTipo } from '../components/AlarmesTipo';
import { AlarmesDose } from '../components/AlarmesDose';
import { AlarmeRecorrencia } from '../components/AlarmeRecorrencia';


export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [initialRoute, setInitialRoute] = useState('Home');

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Cpf" component={Cpf} />
      {/* <Stack.Screen name="Cep" component={Cep} /> */}
      <Stack.Screen name="DtNasc" component={Nascimento} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="Alarmes" component={Alarmes} />
      <Stack.Screen name="AlarmeDetails" component={AlarmeDetails} />
      <Stack.Screen name="AlarmesNome" component={AlarmesNome} />
      <Stack.Screen name="AlarmesFoto" component={AlarmesFoto} />
      <Stack.Screen name="AlarmesTipo" component={AlarmesTipo} />
      <Stack.Screen name="AlarmesDose" component={AlarmesDose} />
      <Stack.Screen name="AlarmeRecorrencia" component={AlarmeRecorrencia}/>
    </Stack.Navigator>
  );
}