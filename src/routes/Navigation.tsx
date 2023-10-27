import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../components/Home';
import { Cep } from '../components/Cep';
import { Nascimento } from '../components/DtNasc';
import { Alarmes } from '../components/Alarmes';

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [initialRoute, setInitialRoute] = useState('Home');

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cep" component={Cep} />
      <Stack.Screen name="DtNasc" component={Nascimento} />
      <Stack.Screen name="Alarmes" component={Alarmes} />
    </Stack.Navigator>
  );
}