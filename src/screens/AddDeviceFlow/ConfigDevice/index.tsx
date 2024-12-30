import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Alert, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CircularProgressBar from "../../../components/circularProgress";
import { ThemeContext } from "../../../provider/theme";
import Header from "../../../components/header";
import Vrs from "../../../components/verticalSpacer";
import GroupButton from "../../../components/groupButton";
import { vs } from "react-native-size-matters/extend";
import { LeftArrow, QrScan } from "../../../constants/images";
import { useSelector } from "react-redux";
import DropDownSelect from "../../../components/dropDownV2";
import WifiService from "../../../services/ wifiService";
import { DropdownItem } from "../../../interfaces/interfaces";



const ConfigDevice = ({ route, navigation }: any) => {
  // const { device} = route.params;
  // const device = {id:1, ssid:'AUTO-LABS-000001', mac:"86:f3:eb:0a:9f:9f"}
  const wifiHelper = new WifiService();
  const { selectedRoom, selectedDevice } = useSelector((state: any) => state.addDevice);
  const { colors, translations } = useContext(ThemeContext)
  const [wifiList, setWifiList] = useState<DropdownItem[]>([]);
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
      <TouchableOpacity onPress={() => { }}>
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
          return;
        }
      }
      const locationEnabled = await wifiHelper.ensureLocationEnabled();
      if (!locationEnabled) {
        console.log('Location services disabled. Cannot proceed.');
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
      } else {
        setTimeout(() => {
          console.log("Re-scanning")
          scanWifi();
        }, 2000)
      }

    } catch (error) {
      console.error('Error during Wi-Fi scanning:', error);
      Alert.alert('Error', 'Failed to scan Wi-Fi networks.');
    }
  };
  useLayoutEffect(() => {
    if (Platform.OS == 'android') {
      setTimeout(() => {
        scanWifi();
      }, 3000);
    } else {
      setWifiList([{
        label: 'E7-F2',
        value: 'E7-F2',
      }])

    }
  }, []);
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
  console.log("WifiList: ", wifiList)
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header LeftIcons={[renderBack]} Title={"Add Device"} RightIcons={[renderScanQr]} />
        <Vrs height={vs(8)} />
        <GroupButton buttons={buttons} />
        <Vrs height={vs(36)} />

        <Vrs height={vs(12)} />
        <Text style={{ color: colors.Text }}>
          {selectedDevice.ssid} {selectedDevice.mac} {selectedRoom.name}
        </Text>
        <DropDownSelect placeHolder="Select wifi" values={wifiList} />
        {/* <CircularProgressBar radius={180} strokeWidth={10} percentage={progress}/> */}
      </SafeAreaView>
    </>
  )
}

export default ConfigDevice

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Primary,
    alignItems: 'center'
  }
})

