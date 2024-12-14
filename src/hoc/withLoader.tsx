import React from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

const withLoader = (WrappedComponent:any) => {
  return (props:any) => {
    // Use the useSelector hook to get the loadingCount from the Redux store
    const {loadingCount, title} = useSelector((state:any) => state.loader);

    return (
      <>
        <WrappedComponent {...props} />
        {loadingCount > 0 && (
          <View style={styles.loaderContainer}>
            {/* <View style={styles.mainContainer}> */}
              <View style={styles.loaderBody}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
              <View style={styles.loaderContent}>
                <Text style={styles.msg}>{title}</Text>
              </View>
            {/* </View> */}
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
    width: '100%'
  },
  // mainContainer:{
  //   height: 100,
  //   width: '50%'
  // },
  loaderBody:{
    height:50,
    width:'50%',
    backgroundColor: "#fff",
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 20,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  loaderContent:{
    height:50,
    width:'50%',
    backgroundColor: "#fff",
    justifyContent:'center',
    alignItems:'center',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },
  msg:{
    color: '#000',
    fontSize: 15,
    fontWeight: 600
  }
});

export default withLoader;