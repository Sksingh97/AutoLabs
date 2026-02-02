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
import { closeAddDeviceFlow, createDeviceRequest, getDeviceTypeRequest, selectDeviceType, selectWifiToConnect, sendDeviceConfigRequest, setWifiToConnectPassword, updateStep } from "../../../store/actions/addDeviceAction";
import SetupHeader from "../../../components/setupHeader";
import SetupHeading from "../../../components/setupHeading";
import CustomButton from "../../../components/button";
import { deviceHeight, deviceWidth } from "../../../utils/helper";
import BleService from "../../../services/bleService";

const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

const SetupDevice = ({ route, navigation }: any) => {
  const { noOfSteps, currentStep} = route.params;
  const { selectedRoom, selectedDevice, deviceTypes, selectedDeviceType, wifiToConnect, applianceName, step, createdDevice, wifiPassword } = useSelector((state: any) => {console.log(state.addDevice); return state.addDevice});
  const { colors, translations } = useContext(ThemeContext)
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0)
  const styles = getStyles(colors)
  const wifiHandler = new WifiService();
  const bleHelper = new BleService();

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

  useLayoutEffect(() => {
    //prepare create device data
    console.log("\n\n------------------Creating Device---------------------")
    if(step == 0){
      const createDevicePayload = {
        "device_mac": selectedDevice.mac,
        "device_category": selectedDeviceType.name,
        "appliance_names": applianceName,
        "room_id": selectedRoom.id,
      }
      console.log("Payload : ", createDevicePayload);
      dispatch(createDeviceRequest(createDevicePayload, 1));
    }

    if(step==1) {
      //establish connection to device hotspot
      console.log("\n\n------------------Conecting to wifi---------------------")
      wifiHandler.connectToWifi(selectedDevice.ssid, 'INventor@**7').then((isConnected)=>{console.log("Connected successfully: ", isConnected); dispatch(updateStep(2))}).catch((reason)=>console.log("Unable to connect : ",reason))
    }

    if(step == 2 && selectedDevice.deviceType == 'WiFi') {
      console.log("\n\n------------------Sending data to device---------------------")
      console.log("Sending data to device on IP: 192.168.4.1")
      const payload = {
        "device_id":createdDevice.device_id,
        "access_token": createdDevice.access_token,
        "mac": selectedDevice.mac,
        "wifiToConnect": wifiToConnect,
        "wifiPassword": wifiPassword,
        "type": "DEVICE_CONFIG"
    }
      console.log("Payload: ",payload);
      dispatch(sendDeviceConfigRequest(payload));
    }

    if(step == 2 && selectedDevice.deviceType == 'BLE') {
      console.log("\n\n------------------Sending data to device via BLE---------------------")
      console.log("Sending data to device on BLE ", selectedDevice.ssid)
      // setIsConnecting(true);
        
      // Connect to the BLE device
      console.log("Connecting to device:", selectedDevice.mac);
      // if (!(await bleHelper.isDeviceConnected(selectedDevice.serviceUUIDs[0]))) {
      //   const device = await bleHelper.connectToDevice(selectedDevice.mac);
      //   console.log("Connected to device:", device);
      // }
      bleHelper.isDeviceConnected(selectedDevice.serviceUUIDs[0]).
      then(async (isConnected) => {
        console.log("Is device connected:", isConnected);
        if (!isConnected) {
          bleHelper.connectToDevice(selectedDevice.mac).then((device) => {
            console.log("Connected to device:", device);
            let payload = JSON.stringify({
            "device_id":createdDevice.device_id,
            "access_token": createdDevice.access_token,
            "mac": selectedDevice.mac,
            "wifiToConnect": wifiToConnect,
            "wifiPassword": wifiPassword,
            "type": "DEVICE_CONFIG"
        });
        console.log("Device is already connected, sending data:", payload);
        bleHelper.writeToCharacteristic(
          selectedDevice.serviceUUIDs[0],
          CHARACTERISTIC_UUID,
          payload,
          true
        ).then(() => {
          console.log("Data sent successfully");
          setTimeout(() => {
            dispatch(updateStep(3));
          }, 5000);
        }).catch((error) => {
          console.log("Error sending data:", error);
        });
          });
        }
  }).
      catch((error) => {
        console.log("Error connecting to device:", error);
      });
    }

    if(step == 3 && selectedDevice.deviceType == 'WiFi') {
      console.log("\n\n------------------Testing device device---------------------")
      wifiHandler.disconnectFromWifi();
      setTimeout(() => {
      dispatch(closeAddDeviceFlow());
    }, 10000);
    }
    if (step == 3 && selectedDevice.deviceType == 'BLE') {
      console.log("\n\n------------------Testing device device---------------------")
      bleHelper.disconnectDevice().then(() => {
        console.log("Device disconnected successfully");
        setTimeout(() => {
          dispatch(closeAddDeviceFlow());
        }, 10000);
      }).catch((error) => {
        console.log("Error disconnecting device:", error);
      });
    }

    if(step == 4) {
      console.log("\n\n------------------disconnect device---------------------")
      setTimeout(() => {
      wifiHandler.disconnectFromWifi();
      bleHelper.disconnectDevice();
    }, 10000);
    }
    
  }, [step]);

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
        <CircularProgressBar radius={180} strokeWidth={10} percentage={25*step}/>
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

