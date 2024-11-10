import { createStackNavigator } from '@react-navigation/stack';
import Auth from '../screens/Authentication/Auth';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { ScreenStackHeaderConfig } from 'react-native-screens';
import TermOfService from '../screens/General/TermsOfService';
import PrivacyPolicy from '../screens/General/PrivacyPolicy';
import Login from '../screens/Authentication/Login';
import SignUp from '../screens/Authentication/SignUp';
import OTP from '../screens/Authentication/OTP';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateRoom from '../screens/AccountSetup/CreateRoom';
import Home from '../screens/Main/Home';
import { AccountSetupRoute } from './constants';
import CreateHome from '../screens/AccountSetup/CreateHome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>

    )
}

const AuthStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{headerShown:false}}
        initialRouteName='Auth'
        >
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="TermOfService" component={TermOfService} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        </Stack.Navigator>
  )
}

const AccountSetupStack = ({loginStep}:any) => {
    return (
      <Stack.Navigator
          screenOptions={{headerShown:false}}
          initialRouteName={AccountSetupRoute[loginStep]}
          >
            <Stack.Screen name="CreateHome" component={CreateHome} />
            <Stack.Screen name="CreateRoom" component={CreateRoom} />
            
          </Stack.Navigator>
    )
  }

  const getMainAppNav = (loginStep:number) => {
    if(loginStep<4) {
        return <AccountSetupStack loginStep={loginStep}/>
    }else{
        return <MainTab/>
    }
  }


const RootNav = () => {
     const {token, loginStep} = useSelector((state:any) => state.auth);
    return (
        <>
        {/* {token != null?getMainAppNav(loginStep): */}
        <AuthStack/>
        {/* } */}
        {/* <AccountSetupStack loginStep={loginStep}/> */}
        </>
    )
}

export default RootNav;