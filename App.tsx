import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/routes/Navigation';
import {  AlarmeProvider } from './src/context/AlarmeContext';

export default function App() {
  return (
    <NavigationContainer>
      <AlarmeProvider>
        <Navigation />
      </AlarmeProvider>
    </NavigationContainer>
  );
}
