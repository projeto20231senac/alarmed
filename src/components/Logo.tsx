import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
            source={require('./assets/images/alarmed.png')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 50,
  },
  containerLogo: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    padding: 15,
    right: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
    width: '100%',
  },
});
