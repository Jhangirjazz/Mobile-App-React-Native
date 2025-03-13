import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 All Rights Reserved</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1A237E',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});

export default Footer;
