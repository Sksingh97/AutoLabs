import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../provider/theme';

const LoaderScreen = () => {
  const { width, height } = Dimensions.get('window');
  const { colors } = useContext(ThemeContext)
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default LoaderScreen;