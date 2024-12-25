import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { Alert, Dimensions, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ThemeContext } from "../../../provider/theme"
import Header from "../../../components/header";
import { Bathroom, Bedroom, Bluetooth, Bulb, Device, LeftArrow, QrScan, Wifi } from "../../../constants/images";
import RadarScanner from "../../../components/radarScanner";
import { mvs, s, vs } from "react-native-size-matters/extend";
import GroupButton from "../../../components/groupButton";
import Vrs from "../../../components/verticalSpacer";
import Heading from "../../../components/heading";
import WifiService from "../../../services/ wifiService";
import { generateRandomNumber } from "../../../utils/helper";

const { width } = Dimensions.get('window');
const radarRadius = width * 0.4;


const AddDeviceScan = () => {
  const { colors, translation } = useContext(ThemeContext);
  const styles = getStles(colors);
  const [wifiList, setWifiList] = useState([]);
  const wifiHelper = new WifiService();
    /**
     * Function to handle Wi-Fi scanning.
     */
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

            // Scan Wi-Fi networks
            const networks = await wifiHelper.scanForSpecificWifi();
            console.log("Networks: ", networks)
            if(networks && networks.length>0) {
              const networksList = networks.map((item, index)=>{
                let angle = generateRandomNumber(0,360);
                let distance = 0.6
                return {
                  id: index,
                  angle: angle,
                  distance: distance,
                  ssid: item.SSID,
                  render: () => (
                    <>
                      <Device width={50} height={50} fill={colors.Text} stroke={colors.Text} />
                      <Text style={styles.infoText}>{item.SSID}</Text>
                    </>
                  ),
                }
              })
              setWifiList(networksList);
            }else {
              // setTimeout(()=>{
              //   console.log("Re-scanning")
              //   scanWifi();
              // }, 2000)
            }
            
        } catch (error) {
            console.error('Error during Wi-Fi scanning:', error);
            Alert.alert('Error', 'Failed to scan Wi-Fi networks.');
        }
    };
  useLayoutEffect(() => {
    setTimeout(()=>{
      scanWifi();
    },3000);
  }, []);

  const renderBack =() =>{
    return (
      <TouchableOpacity onPress={()=>{}}>
          <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text} />
      </TouchableOpacity>
    )
  }

  const renderScanQr =() =>{
    return (
      <TouchableOpacity onPress={()=>{}}>
          <QrScan width={25} height={25} fill={colors.Text} stroke={colors.Text} />
      </TouchableOpacity>
    )
  }
  const handleDevicePress = (device) => {
    console.log('Device pressed:', device);
  };


  return(
    <SafeAreaView style={styles.container}>
      <Header LeftIcons={[renderBack]} Title={"Add Device"} RightIcons={[renderScanQr]}/>
      <Vrs height={vs(8)}/>
      <GroupButton/>
      <Vrs height={vs(36)}/>
       
      <Vrs height={vs(12)}/>
      <View style={styles.infoContainer}>
          <View style={styles.infoDetails}>
            <View style={styles.infoIcons}>
              <Wifi  width={15} height={15}/>
            </View>
            <View style={styles.infoIcons}>
              <Bluetooth  width={15} height={15} />
            </View>
            <Text  style={styles.infoText}> Turn on your Wifi & Bluetooth to connect</Text>
          </View>
      </View>
      <Vrs height={vs(36)}/>
      <View style={styles.scannerContainer}>
        <RadarScanner
          width={vs(Platform.OS=='ios'?550:500)}
          scannedDevices={wifiList}
          onDevicePress={handleDevicePress}
        />
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Can't find your device?</Text>
        <Vrs height={vs(16)}/>
        <TouchableOpacity><Text style={styles.questionButton}>Learn More</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AddDeviceScan

const getStles = (colors) => StyleSheet.create({
  container:{
    backgroundColor : colors.Primary,
    flex:1,
    alignItems: 'center'
  },
  scannerContainer: {
    width: vs(Platform.OS=='ios'?550:500),
    height: vs(Platform.OS=='ios'?445:400),
    paddingHorizontal: Platform.OS == 'ios'?43:48
  },
  iconContainer: {
    height: s(60),
    width: s(60),
    borderRadius: 30,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: colors.Border
  },
  titleContainer:{
    height: vs(38),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText:{
    fontWeight: 'bold',
    color: colors.Text,
    fontSize: mvs(23)
  },
  infoContainer:{
    height: vs(36),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoDetails:{
    height: vs(36),
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection:'row',
    borderRadius: 18,
    backgroundColor: colors.Border,
    paddingHorizontal: 8
  },
  infoIcons:{
    height: s(20),
    width: s(20),
    backgroundColor: colors.Button.Primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoText:{
    fontSize: mvs(Platform.OS == 'ios'?13:15),
    color: colors.Text
  },
  questionContainer:{
    position: 'absolute',
    bottom: 0,
    height: vs(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText:{
    color: colors.Text
  },
  questionButton: {
    color: colors.Button.Primary
  }
})


