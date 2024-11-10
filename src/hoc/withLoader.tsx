import React from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const withLoader = (WrappedComponent:any) => {
  return (props:any) => {
    // Use the useSelector hook to get the loadingCount from the Redux store
    const loadingCount = useSelector((state:any) => state.loader.loadingCount);

    return (
      <>
        <WrappedComponent {...props} />
        {loadingCount > 0 && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </>
    );
  };
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default withLoader;