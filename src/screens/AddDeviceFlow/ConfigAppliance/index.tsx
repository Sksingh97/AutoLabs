import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ThemeContext } from "../../../provider/theme";
import Vrs from "../../../components/verticalSpacer";
import { mvs, s, vs } from "react-native-size-matters/extend";
import { LeftArrow, QrScan } from "../../../constants/images";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../../components/inputField";
import SetupHeader from "../../../components/setupHeader";
import SetupHeading from "../../../components/setupHeading";
import CustomButton from "../../../components/button";
import { deviceHeight, deviceWidth } from "../../../utils/helper";
import { array } from "prop-types";
import { setApplianceNames, setDeviceName } from "../../../store/actions/addDeviceAction";



const ConfigAppliance = ({ route, navigation }: any) => {
  const { noOfSteps, currentStep} = route.params;
  const { selectedRoom, selectedDevice, deviceTypes, selectedDeviceType, wifiToConnect, wifiPassword } = useSelector((state: any) => state.addDevice);
  const { colors, translations } = useContext(ThemeContext);
  const [applianceNames, setFormApplianceName] = useState(Array.from({ length: selectedDeviceType.output }, (_, index) => ""))
  const [ deviceName, setFormDeviceName ] = useState(""); 
  const [ deviceNameError, setDeviceNameError ] = useState("");
  const dispatch = useDispatch();
  const styles = getStyles(colors)
  console.log("selectedDevice", selectedDevice);
  const renderBack = () => {
    return (
      <TouchableOpacity onPress={() => {  navigation.pop();  }}>
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

  const saveData=()=>{
    dispatch(setDeviceName(deviceName));
    dispatch(setApplianceNames(applianceNames));
    navigation.push('SetupDevice',{ noOfSteps:3, currentStep:3})

  }
  const renderStepCount =()=><Text style={styles.text}> {currentStep} / {noOfSteps} </Text>
  const renderApplianceNameField=()=>{
    return(<>
    {selectedDeviceType && selectedDeviceType.output>0 && Array.from({ length: selectedDeviceType.output }, (_, index) => (
        <View key={`APP-NAME-${index}`}>
             <InputField label={`Appliance ${index+1} Name`} placeHolder={"Appliance Name"}  onChange={(value:string)=>{onApplianceNameChange(value, index)}}/>
             <Vrs height={vs(35)}/>
        </View>
    ))}
    </>)
  }

  const onApplianceNameChange = (name:string, index:number) => {
    let _tempApplianceName = applianceNames;
    _tempApplianceName[index] = name;
    setFormApplianceName([..._tempApplianceName])
  }

  const validateDeviceName = () =>{
    if(deviceName.length==0) {
        setDeviceNameError("Device Name is required")
    }
  }
  return (
    <>
      <View style={styles.container}>
        
        <SetupHeader LeftIcons={[renderBack]} noOfStep={noOfSteps} currentStep={currentStep} RightIcons={[renderStepCount]}/>
        <Vrs height={vs(20)}/>
        <SetupHeading message={()=><Text style={styles.headerText}>Config Appliance</Text>}/>
        <ScrollView style={styles.scrollContainer}>
            <Vrs height={vs(35)}/>
            <InputField label={"Device Name"} placeHolder={"Device Name"}  onChange={(value:string)=>{setDeviceNameError("");setFormDeviceName(value)}} onFocusOut={validateDeviceName} hasError={deviceNameError.length>0} error={deviceNameError}/>
            <Vrs height={vs(35)}/>
            {renderApplianceNameField()}
            <Vrs height={vs(20)}/>
            <View style={styles.buttonContainer}>
                <CustomButton title={translations.setupScreen.save} buttonStyle={styles.button} onPress={saveData}/>
            </View>
            <Vrs height={vs(40)}/>
        </ScrollView>
      </View>
    </>
  )
}

export default ConfigAppliance

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
    width:'100%',
  }
})

