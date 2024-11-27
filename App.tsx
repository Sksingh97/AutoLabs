// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import RootNav from './src/navigation';
// import { ThemeProvider } from './src/provider/theme';
// import { Provider, useDispatch } from 'react-redux';
// import store from './src/store';
// import withLoader from './src/hoc/withLoader';
// import { navigationRef } from './src/navigation/navigationService';
// import Toast from 'react-native-toast-message';
// import { loadUserDetailsRequest } from './src/store/actions/authAction';





// const MainApp = withLoader(()=>{
//   const dispatch = useDispatch();
//   return (
//     <ThemeProvider>
//       <NavigationContainer ref={navigationRef} onReady={()=>{dispatch(loadUserDetailsRequest({}));}}>
//         <RootNav/>
//         <Toast/>
//       </NavigationContainer>
//     </ThemeProvider>
//   )
// });

// function App(): JSX.Element {
//   return (
//     <Provider store={store}>
//       <MainApp/>
//     </Provider>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import BootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import RootNav from './src/navigation';
import { ThemeProvider } from './src/provider/theme';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/store';
import { navigationRef } from './src/navigation/navigationService';
import Toast from 'react-native-toast-message';
import StorageService from './src/services/localStorageService';
import { USER_DETAILS_KEY } from './src/utils/constants';
// import { loadUserDetails } from './src/store/actions/authAction';
import { LoggedInUser } from './src/interfaces/userInfo';
import { getUserDetailsRequest, loadUserDataFromStore, refreshTokenRequest } from './src/store/actions/authAction';
import withLoader from './src/hoc/withLoader';


const MainApp = withLoader(()=>{  
  const dispatch = useDispatch();
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const data: LoggedInUser|null = await StorageService.getData(USER_DETAILS_KEY);
        if (data && data.token) {
          dispatch(loadUserDataFromStore(data));
          dispatch(refreshTokenRequest(data));
          dispatch(getUserDetailsRequest({}))
        }
      } catch (error) {
        console.error('Error retrieving user details from storage:', error);
      } finally {
        setAppReady(true);
        BootSplash.hide();
      }
    };
    initializeApp();
  }, [dispatch]);
  if (!isAppReady) {
    return null;
  }else {
    // StorageService.clearStorage()
  }

  return (
    <ThemeProvider>
      <NavigationContainer ref={navigationRef}>
        <RootNav />
        <Toast />
      </NavigationContainer>
    </ThemeProvider>
  );
});

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <MainApp/>
    </Provider>
  );
}

export default App;

