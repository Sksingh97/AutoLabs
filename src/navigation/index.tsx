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
import CreateFloor from '../screens/AccountSetup/CreateFloor';
import WellDone from '../screens/AccountSetup/WellDone';
import { Dimensions } from 'react-native';
import { deviceWidth } from '../utils/helper';
import AddDevice from '../screens/AddDeviceFlow/AddDevice';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
        screenOptions={{
          tabBarPosition: deviceWidth() < 600 ? 'bottom' : 'left',
          headerShown: false,
          animation : 'shift',
        }}
        initialRouteName='AddDeviceFlow'
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen
              name="AddDeviceFlow"
              component={AddDeviceStack} // Use ProfileStack here
              options={{
                tabBarStyle: { display: 'none' },  // Ensure the tab bar is shown here
                tabBarButton: ()=>null,
              }}
            />
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

const AddDeviceStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{headerShown:false}}
        initialRouteName='AddDevice'
        >
          <Stack.Screen name="AddDevice" component={AddDevice} />
        </Stack.Navigator>
  )
}

const AccountSetupStack = ({loginStep}:any) => {
    return (
      <Stack.Navigator
          screenOptions={{headerShown:false}}
          initialRouteName={AccountSetupRoute[loginStep]}
          >
            <Stack.Screen name="CreateHome" component={CreateHome} initialParams={{noOfSteps:4,currentStep:1}}/>
            <Stack.Screen name="CreateFloor" component={CreateFloor} />
            <Stack.Screen name="CreateRoom" component={CreateRoom} />
            <Stack.Screen name="WellDone" component={WellDone} />
          </Stack.Navigator>
    )
  }

  const getMainAppNav = (loginStep:number) => {
    console.log("LOGIN STEP : : : :", loginStep)
    if(loginStep<4) {
        return <AccountSetupStack loginStep={loginStep}/>
    }else{
        return <MainTab/>
    }
  }


const RootNav = () => {
     const {token, login_step} = useSelector((state:any) => state.auth);
     return (
        <>
        {token != null?getMainAppNav(login_step):<AuthStack/>}
        {/* <AuthStack/>
        <AccountSetupStack loginStep={loginStep}/> */}
        </>
    )
}

export default RootNav;