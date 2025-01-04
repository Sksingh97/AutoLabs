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



const SetupDevice = ({ route, navigation }: any) => {
  const { noOfSteps, currentStep} = route.params;
  const { selectedRoom, selectedDevice, deviceTypes, selectedDeviceType, wifiToConnect } = useSelector((state: any) => state.addDevice);
  const { colors, translations } = useContext(ThemeContext)
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0)
  const styles = getStyles(colors)

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

  useEffect(() => {
    const incrementProgress = () => {
      const randomInterval = Math.random() * 1000 + 200; // Random delay between 200ms and 1200ms
      setTimeout(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 100; // Stop incrementing when progress reaches 100
          }
          incrementProgress(); // Call the function recursively
          return prev + Math.floor(Math.random() * 10) + 1; // Random increment between 1 and 10
        });
      }, randomInterval);
    };

    incrementProgress(); // Start the random increment process

    return () => {
      setProgress(0); // Reset progress when component unmounts
    };
  }, []);
  const saveData=()=>{
  }
  const renderStepCount =()=><Text style={styles.text}> {currentStep} / {noOfSteps} </Text>

  return (
    <>
      <View style={styles.container}>
        
        <SetupHeader LeftIcons={[renderBack]} noOfStep={noOfSteps} currentStep={currentStep} RightIcons={[renderStepCount]}/>
        <Vrs height={vs(30)}/>
        <SetupHeading message={()=><Text style={styles.headerText}>Setup Device</Text>}/>
        <Vrs height={vs(30)}/>
        <CircularProgressBar radius={180} strokeWidth={10} percentage={progress}/>
        <Vrs height={vs(20)}/>
        {/* <View style={styles.buttonContainer}> */}
            {/* <CustomButton title={translations.setupScreen.back} isDisabled={currentStep==1}  buttonStyle={styles.button} onPress={()=>{navigation.pop()}}/> */}
            {/* <CustomButton title={translations.setupScreen.save} buttonStyle={styles.button} onPress={saveData}/> */}
        {/* </View> */}
        <Vrs height={vs(40)}/>
      </View>
    </>
  )
}

export default SetupDevice

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

