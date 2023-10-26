import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/sharedLogoStyles';

export const Logo = ({ showBackButton }) => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity style={styles.back} onPress={() => goBack()}>
            <AntDesign name="arrowleft" size={28} color="black" />
          </TouchableOpacity>
        )}
        <View style={styles.containerLogo}>
          <Image
            style={styles.logo}
            source={require('../assets/images/alarmed.png')}
          />
        </View>
      </View>
    </View>
  );
};


