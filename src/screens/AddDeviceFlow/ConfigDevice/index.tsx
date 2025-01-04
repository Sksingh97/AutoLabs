import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CircularProgressBar from "../../../components/circularProgress";
import { ThemeContext } from "../../../provider/theme";
import Header from "../../../components/header";
import Vrs from "../../../components/verticalSpacer";
import GroupButton from "../../../components/groupButton";
import { mvs, s, vs } from "react-native-size-matters/extend";
import { LeftArrow, QrScan } from "../../../constants/images";
import { useDispatch, useSelector } from "react-redux";
import DropDownSelect from "../../../components/dropDownV2";
import WifiService from "../../../services/ wifiService";
import { DropdownItem } from "../../../interfaces/interfaces";
import InputField from "../../../components/inputField";
import { getDeviceTypeRequest, selectDeviceType, selectWifiToConnect, setWifiToConnectPassword } from "../../../store/actions/addDeviceAction";
import SetupHeader from "../../../components/setupHeader";
import SetupHeading from "../../../components/setupHeading";
import CustomButton from "../../../components/button";
import { deviceHeight, deviceWidth } from "../../../utils/helper";



const ConfigDevice = ({ route, navigation }: any) => {
  // const { device} = route.params;
  // const device = {id:1, ssid:'AUTO-LABS-000001', mac:"86:f3:eb:0a:9f:9f"}
  const { noOfSteps, currentStep} = route.params;
  const wifiHelper = new WifiService();
  const { selectedRoom, selectedDevice, deviceTypes, selectedDeviceType, wifiToConnect } = useSelector((state: any) => state.addDevice);
  const { colors, translations } = useContext(ThemeContext)
  const [wifiList, setWifiList] = useState<DropdownItem[]>([]);
  const [wifiLoading, setWifiLoading] = useState(false);
  const [ deviceTypeList, setDeviceTypeList ] = useState<DropdownItem[]>([]);
  const [ wifiPassword, setWifiPassword ] = useState("");
  const [ wifiPassError, setWifiPassError ] = useState("");
  const dispatch = useDispatch();
  // const [progress, setProgress] = useState(0)
  const styles = getStyles(colors)
  const buttons = [
    {
      title: translations.addDeviceScan.nearBy,
      onPress: () => { }
    },
    {
      title: translations.addDeviceScan.manual,
      onPress: () => { }
    }
  ]

  const renderBack = () => {
    return (
      <TouchableOpacity onPress={() => { navigation.pop(); }}>
        <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text} />
      </TouchableOpacity>
    )
  }

  const renderScanQr = () => {
    return (
      <TouchableOpacity onPress={() => { }}>
        <QrScan width={25} height={25} fill={colors.Text} stroke={colors.Text} />
      </TouchableOpacity>
    )
  }

  const scanWifi = async () => {
    try {
      const hasPermission = await wifiHelper.checkPermission();
      if (!hasPermission) {
        const granted = await wifiHelper.requestPermission();
        if (!granted) {
          Alert.alert('Permission Required', 'Wi-Fi scanning requires location permission.');
          setWifiLoading(false);
          return;
        }
      }
      const locationEnabled = await wifiHelper.ensureLocationEnabled();
      if (!locationEnabled) {
        console.log('Location services disabled. Cannot proceed.');
        setWifiLoading(false);
        return;
      }
      // Scan Wi-Fi networks
      const networks = await wifiHelper.scanWifiNetworks();
      if (networks && networks.length > 0) {
        const networksList = networks.map((item) => {
          return {
            label: item.SSID,
            value: item.SSID,
          }
        })
        const uniqueWifiList = Array.from(new Set(networksList.map(item=>JSON.stringify(item)))).map(item=>JSON.parse(item));
        console.log("unique list: ", uniqueWifiList)
        setWifiList(uniqueWifiList);
        setWifiLoading(false);
      } else {
        setTimeout(() => {
          console.log("Re-scanning")
          scanWifi();
        }, 2000)
      }

    } catch (error) {
      console.error('Error during Wi-Fi scanning:', error);
      Alert.alert('Error', 'Failed to scan Wi-Fi networks.');
      setWifiLoading(false);
    }
  };

  useLayoutEffect(() => {
    setWifiLoading(true);
    dispatch(getDeviceTypeRequest());
    if (Platform.OS == 'android') {
      setTimeout(() => {
        scanWifi();
      }, 3000);
    } else {
      setWifiList([{
        label: 'E7-F2',
        value: 'E7-F2',
      }])
      setWifiLoading(false);
    }
  }, []);

  useEffect(()=>{
    if(deviceTypes.length>0){
      const deviceList = deviceTypes.map(item=>({label: item.name.charAt(0).toUpperCase() + item.name.slice(1), value: item.name}))
      setDeviceTypeList(deviceList);
    }
  },[deviceTypes])

  const onWifiSelect = (item:DropdownItem) => {
    dispatch(selectWifiToConnect(item.value));
  }
  const onDeviceTypeSelect = (item: DropdownItem) => {
    console.log("Selected deviceType:   ", item)
    const selectedDevice = deviceTypes.filter(rec => rec.name == item.value)
    if(selectedDevice.length>0){
      dispatch(selectDeviceType(selectedDevice[0]));
    }
  }

  const onPasswordChange = (password:string) => {
    setWifiPassError("");
    setWifiPassword(password);
  }

  const validatePassword = () => {
    if(!(wifiPassword.length>8)){
      setWifiPassError("Wifi password length less then 8");
    }
  }
  const validateData = () => {
    console.log("wifiPassError : ", wifiPassError, wifiPassword)
    if (!(wifiPassword.length>=8)){
      return true;
    }
    console.log("selectedDeviceType : ", selectedDeviceType?.name)
    if(!selectedDeviceType?.name) {
      return true;
    }
    console.log("selectedDevice : ", selectedDevice?.ssid)
    if(!selectedDevice?.ssid) {
      return true;
    }
    console.log("selectedRoom : ", selectedRoom?.name)
    if(!selectedRoom?.name) {
      return true;
    }
    console.log("wifiToConnect : ", wifiToConnect)
    if(wifiToConnect.length==0){
      return true;
    }
    return false;
  }
  // useEffect(() => {
  //   const incrementProgress = () => {
  //     const randomInterval = Math.random() * 1000 + 200; // Random delay between 200ms and 1200ms
  //     setTimeout(() => {
  //       setProgress((prev) => {
  //         if (prev >= 100) {
  //           return 100; // Stop incrementing when progress reaches 100
  //         }
  //         incrementProgress(); // Call the function recursively
  //         return prev + Math.floor(Math.random() * 10) + 1; // Random increment between 1 and 10
  //       });
  //     }, randomInterval);
  //   };

  //   incrementProgress(); // Start the random increment process

  //   return () => {
  //     setProgress(0); // Reset progress when component unmounts
  //   };
  // }, []);
  const saveData=()=>{
    dispatch(setWifiToConnectPassword(wifiPassword));
    navigation.push('ConfigAppliance',{ noOfSteps:3, currentStep:2})
  }
  const renderStepCount =()=><Text style={styles.text}> {currentStep} / {noOfSteps} </Text>

  return (
    <>
      <View style={styles.container}>
        
        <SetupHeader LeftIcons={[renderBack]} noOfStep={noOfSteps} currentStep={currentStep} RightIcons={[renderStepCount]}/>
        <Vrs height={vs(30)}/>
        <SetupHeading message={()=><Text style={styles.headerText}>Config Device</Text>}/>
        <ScrollView style={styles.scrollContainer}>
        <Vrs height={vs(30)}/>
        <DropDownSelect placeHolder={wifiLoading?"Scanning...":"Select wifi"} values={wifiList} isLoading={wifiLoading} onValueChange={onWifiSelect} label="Select Wifi"/>
        <Vrs height={vs(20)}/>
        <InputField label={"Wifi Password"} isSecure placeHolder={"Wifi Password"} rightIconType="Eye" showRightIcon onChange={onPasswordChange} hasError={wifiPassError.length>0} error={wifiPassError} onFocusOut={validatePassword}/>
        <Vrs height={vs(30)}/>
        <DropDownSelect placeHolder={"Select Device Type"} values={deviceTypeList} onValueChange={onDeviceTypeSelect} label="Select Device Type"/>
        {/* <CircularProgressBar radius={180} strokeWidth={10} percentage={progress}/> */}
        <Vrs height={vs(20)}/>
        <View style={styles.buttonContainer}>
            {/* <CustomButton title={translations.setupScreen.back} isDisabled={currentStep==1}  buttonStyle={styles.button} onPress={()=>{navigation.pop()}}/> */}
            <CustomButton title={translations.setupScreen.save} buttonStyle={styles.button} onPress={saveData} isDisabled={validateData()}/>
        </View>
        <Vrs height={vs(40)}/>
        </ScrollView>
      </View>
    </>
  )
}

export default ConfigDevice

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Primary,
    alignItems: 'center',
    height: '100%',
  },
  text: {
    color: colors.Text
  },
  headerText:{
    color: colors.Text,
    fontSize: mvs(20),
    fontWeight: '600'
  },
  buttonContainer:{
    width:'100%',
    // position:'absolute',
    // bottom: 30,
    alignItems:'center'
      },
  button:{
      width:s(deviceWidth()-(Platform.OS=='ios'?40:60)),
  },
  scrollContainer:{
    // backgroundColor: 'red'
  }
})

