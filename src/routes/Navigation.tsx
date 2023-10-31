import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../components/Home';
import { Cep } from '../components/Cep';
import { Cpf } from '../components/Cpf';
import { Nascimento } from '../components/DtNasc';
import { Alarmes } from '../components/Alarmes';
import { AlarmesNome } from '../components/AlarmesNome';
// import { AlarmesFoto } from '../components/AlarmesFoto';

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [initialRoute, setInitialRoute] = useState('Home');

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cpf" component={Cpf} />
      <Stack.Screen name="Cep" component={Cep} />
      <Stack.Screen name="DtNasc" component={Nascimento} />
      <Stack.Screen name="Alarmes" component={Alarmes} />
      <Stack.Screen name="AlarmesNome" component={AlarmesNome} />
      {/* <Stack.Screen name="AlarmesFoto" component={AlarmesFoto} /> */}
    </Stack.Navigator>
  );
}