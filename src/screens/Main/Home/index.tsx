import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { deviceHeight, deviceWidth, scaleSize } from "../../../utils/helper";
import { vs, s, mvs } from 'react-native-size-matters/extend';
import DropDown from "../../../components/dropDown";
import { Add, AlertIcon, AQI, Bot, CloudSun, MicIcon, NoData, Vector, WaterDrop, WeatherBg, Wind } from "../../../constants/images";
import { useContext } from "react";
import { ThemeContext } from "../../../provider/theme";
import { useDispatch } from "react-redux";
import { ms } from "react-native-size-matters";
import Vrs from "../../../components/verticalSpacer";
import CustomButton from "../../../components/button";


const Home = ({route, navigation}:any) => {
    const {colors, translations} = useContext(ThemeContext)
    const styles = getStyles(colors);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={styles.containr}>
            <View style={styles.headerContainer}>
                <DropDown/>
                <View style={styles.iconContainer}>
                    <Bot width={mvs(48)} height={mvs(48)} fill={colors.Text} stroke={colors.Text} />
                    <AlertIcon width={mvs(48)} height={mvs(48)}  />
                </View>
            </View>
            <View style={styles.weatherContainer}>
                <WeatherBg width={ms(deviceWidth()*.85)} height={vs(180)} fill={colors.Text} stroke={colors.Text} />
                <View style={styles.weatherImage}>
                    <CloudSun width={ms(105)} height={vs(105)} stroke={colors.TextWhite}/>
                </View>
                <View style={styles.weatherDetailsContainer}>
                    <Text style={styles.weatherTempText}> 20 &deg;C</Text>
                    <Text style={styles.weatherLocationText}> New York City, USA</Text>
                    <Text  style={styles.weatherLocationText}> Today Cloudy</Text>
                    <View style={styles.wetherItemDetailsContainer}>
                        <View style={styles.weatherItem}>
                            <AQI width={ms(15)} height={vs(15)} fill={colors.TextWhite}  />
                            <Text style={styles.detailItemText}>AQI 92</Text>
                        </View>
                        <View style={styles.weatherItem}>
                            <WaterDrop width={ms(15)} height={vs(15)} fill={colors.TextWhite}  />
                            <Text style={styles.detailItemText}>78.2%</Text>
                        </View>
                        <View style={styles.weatherItem}>
                            <Wind width={ms(15)} height={vs(15)} fill={colors.TextWhite}  />
                            <Text style={styles.detailItemText}>20 m/s</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Vrs height={vs(20)}/>
            <View style={styles.allDeviceContainer}>
                <Text>All Devices</Text>
                <Vector width={mvs(20)} height={mvs(20)} fill={colors.Text} stroke={colors.Text} />
            </View>
            <Vrs height={vs(20)}/>
            <View style={styles.floorListContainer}>
                <View style={styles.floorContainer}>
                    <Text style={styles.floorText}>Floor 1</Text>
                </View>
                <View style={styles.floorContainer}>
                    <Text style={styles.floorText}>Floor 2</Text>
                </View>
                <View style={styles.floorContainer}>
                    <Text style={styles.floorText}>Floor 3</Text>
                </View>
            </View>
            <View style={styles.roomListContainer}>
                <View style={[styles.roomContainer, styles.shadowBox]}>
                    <Text style={styles.roomText}>
                        All Rooms
                    </Text>
                </View>
                <View style={[styles.roomContainer, styles.shadowBox]}>
                    <Text style={styles.roomText}>
                        All Rooms
                    </Text>
                </View>
                <View style={[styles.roomContainer, styles.shadowBox]}>
                    <Text style={styles.roomText}>
                        All Rooms
                    </Text>
                </View>
            </View>
            <Vrs height={vs(20)}/>
            <View style={styles.devicesContainer}>
                <View style={styles.noDataContainer}>
                    <NoData width={mvs(120)} height={mvs(117)} />
                </View>
                <View style={styles.detailContainer}>
                    <Vrs height={vs(20)}/>
                    <Text>No Device</Text>
                    <Vrs height={vs(20)}/>
                    <Text>You haven't added a device yet.</Text>
                </View>
                <Vrs height={vs(20)}/>
                <View style={styles.buttonContainer}>
                    <CustomButton showIcon={true} title={translations.homeScreen.addDevice} buttonStyle={styles.button} onPress={()=>{}}/>
                </View>
            </View>
            <View style={styles.buttonGroupContainer}>
                <TouchableOpacity style={[styles.roundButtonContainer, {backgroundColor: colors.Button.Shade}]}>
                    <MicIcon width={mvs(28)} height={mvs(28)} fill={colors.Button.Primary}  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.roundButtonContainer, {backgroundColor: colors.Button.Primary}]}>
                    <Add width={mvs(28)} height={mvs(28)} fill={colors.TextWhite} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Home;

const getStyles = (colors) => StyleSheet.create({
    containr : {
        flex:1,
        alignContent: 'center',
        backgroundColor: colors.Primary
    },
    headerContainer:{
        height: vs(72),
        width: '100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
    },
    iconContainer:{
        flexDirection:'row',
        width: s(110),
        justifyContent:'space-between'
    },
    weatherContainer:{
        alignItems:"center",
    },
    weatherImage:{
        position: 'absolute',
        top:vs(45),
        right: s(50),
    },
    wetherItemDetailsContainer: {
        flexDirection:'row'
    },
    weatherItem:{
        flexDirection: 'row',
        width: s(70),
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    detailItemText:{
        color: colors.TextWhite,
        fontSize: mvs(12),
    },
    weatherDetailsContainer:{
        position:'absolute',
        top: vs(40),
        left: s(30),
        height: vs(120),
        // backgroundColor:'red',
        justifyContent:'space-evenly'
    },
    weatherLocationText:{
        fontSize: mvs(14),
        color: colors.TextWhite,
    },
    weatherTempText: {
        fontSize: mvs(20),
        color: colors.TextWhite,
        fontWeight: 'bold'
    },
    floorListContainer:{
        flexDirection:'row',
        paddingLeft: s(20)
    },
    floorContainer:{
        width:s(70),
        height:vs(20),
        backgroundColor: colors.Border,
        // borderTopStartRadius: s(20),
        borderTopEndRadius: s(35),
        borderBottomStartRadius: s(35),
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:s(10),
        borderColor:colors.Border,
        borderWidth:1,
        marginRight: s(10),
    },
    floorText:{
        fontSize: mvs(12),
        color: colors.Text
    },
    roomListContainer: {
        height: vs(40),
        width: '90%',
        marginHorizontal: s(20),
        alignItems:'center',
        flexDirection:'row'
    },
    roomContainer: {
        height: vs(30),
        width: s(100),
        flexDirection:'row',
        backgroundColor: colors.Primary,
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal:15,
        borderTopEndRadius: s(50),
        borderBottomStartRadius: s(50),
        borderColor: colors.Border,
        marginRight: s(10),
        borderWidth: 1,
    
    },
    roomText: {
        fontSize: mvs(15),
        color: colors.Text
    },
    allDeviceContainer: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: s(25)
    },
    shadowBox: {
        shadowColor: '#000', // Dark, enigmatic shadow
        shadowOffset: { width: 0, height: 4 }, // The shadow’s position
        shadowOpacity: 0.3, // Transparency of the shadow
        shadowRadius: 6, // Softness of the shadow
        elevation: 8, // For Android devices, to orchestrate the shadow’s depth
    },
    devicesContainer: {
        marginHorizontal: s(20),
        width:'90%',
        // backgroundColor:'red',
        height: vs(281),
        alignItems:'center'
    },
    noDataContainer: {
        height: vs(117),
        width: s(120),
    },
    detailContainer: {
        alignItems:'center'
    },
    buttonContainer: {
        height: vs(20),
    },
    button: {
        width: s(155),
        height: vs(50),
    },
    buttonGroupContainer:{
        width:'95%',
        height: vs(72),
        marginLeft: s(20),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        paddingBottom: 16
    },
    roundButtonContainer: {
        height: vs(56),
        width: vs(56),
        marginRight: s(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: vs(28)
    }

})