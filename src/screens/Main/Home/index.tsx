import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Switch, Platform, TouchableWithoutFeedback } from "react-native"
import { deviceHeight, deviceWidth, scaleSize } from "../../../utils/helper";
import { vs, s, mvs } from 'react-native-size-matters/extend';
import DropDown from "../../../components/dropDown";
import { Add, AlertIcon, AQI, Bot, CloudSun, MicIcon, NoData, Vector, WaterDrop, WeatherBg, Wind, Appliance } from "../../../constants/images";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../provider/theme";
import { useDispatch, useSelector } from "react-redux";
import { ms } from "react-native-size-matters";
import Vrs from "../../../components/verticalSpacer";
import CustomButton from "../../../components/button";
import { initiateAddDeviceFlow } from "../../../store/actions/addDeviceAction";
import { getFloorRequest } from "../../../store/actions/floorAction";
import { getRoomRequest } from "../../../store/actions/roomAction";
import { getHomeDetailsRequest, getHomeRequest, toggleFavoriteAppliance, setFavoriteAppliances } from "../../../store/actions/homeActions";
import { updateApplianceRequest } from '../../../store/actions/applianceAction';
import React from "react";
import StorageService from "../../../services/localStorageService";
import { FAVORITE_APPLIANCES_KEY } from "../../../utils/constants";
import { buildWidgetPayload, updateWidgetData } from "../../../services/widgetService";


const SELECTED_FLOOR_ID = -1;
const FAVORITE_ROOM_ID = -1;

const Home = ({route, navigation}:any) => {
    const {colors, translations} = useContext(ThemeContext);
    const { homes, homeDetials, favoriteApplianceIds } = useSelector((state:any) => state.home);
    const { token } = useSelector((state:any) => state.auth);
    const [ selectedFloor, setSelectedFloor ] = useState(0);
    const [ selectedRoom, setSelectedRoom ] = useState(0);
    const [ selectedHome, setSelectedHoom ] = useState(0);
    const styles = getStyles(colors);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const loadFavorites = async () => {
            const favorites = await StorageService.getData(FAVORITE_APPLIANCES_KEY);
            if (favorites && Array.isArray(favorites)) {
                dispatch(setFavoriteAppliances(favorites));
            }
        };
        loadFavorites();
        dispatch(getHomeRequest({showLoader:homeDetials.length==0}))
    },[])
    useEffect(()=>{
        if(selectedHome != 0){
            dispatch(getHomeDetailsRequest({id:selectedHome, showLoader: homes.length == 0}))
        }
    },[selectedHome])
    useEffect(()=>{
        if(selectedFloor == 0 && homeDetials.length>0){
            if(favoriteApplianceIds.length > 0) {
                setSelectedFloor(SELECTED_FLOOR_ID);
            } else {
                setSelectedFloor(homeDetials[0].id)
            }
        }
    },[homeDetials, favoriteApplianceIds])
    useEffect(()=>{
        if(selectedFloor != 0){
            if(selectedFloor === SELECTED_FLOOR_ID) {
                setSelectedRoom(FAVORITE_ROOM_ID);
            } else if(homeDetials.length>0) {
                const rooms = getSelectedFloorRooms()
                if(rooms.length>0) {
                    setSelectedRoom(rooms[0].id)
                }
            }
        }
    },[selectedFloor, homeDetials])
    useEffect(()=>{
        if(homes.length>0){
            setSelectedHoom(homes[0].id)
        }
        //fetch floors 
        // dispatch(getFloorRequest())
        // //fetch rooms
        // dispatch(getRoomRequest())
    },[homes]);

    useEffect(() => {
        const payload = buildWidgetPayload(homeDetials, favoriteApplianceIds, token);
        updateWidgetData(payload);
    }, [homeDetials, favoriteApplianceIds, token]);

    const handleToggleSwitch = (id: number, currentValue: string) => {
        dispatch(updateApplianceRequest({
            appliance_id: id,  
            value: currentValue === "LOW" ? "HIGH" : "LOW"
        }));
    };

    const handleLongPress = async (id: number) => {
        dispatch(toggleFavoriteAppliance(id));
        const updatedFavorites = favoriteApplianceIds.includes(id)
            ? favoriteApplianceIds.filter((fId: number) => fId !== id)
            : [...favoriteApplianceIds, id];
        await StorageService.storeData(FAVORITE_APPLIANCES_KEY, updatedFavorites);
    };

    const renderFloor = ({item}) => {
        return (
            <TouchableOpacity onPress={()=>{setSelectedFloor(item.id)}} style={[styles.floorContainer, selectedFloor==item.id?styles.active:{}]}>
                <Text style={[styles.floorText, selectedFloor==item.id?styles.textActive:{}]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const renderRooms = ({item}) => {
        return (
            <TouchableOpacity onPress={()=>{setSelectedRoom(item.id)}} style={[styles.roomContainer, selectedRoom==item.id?styles.active:{}]}>
                <Text style={[styles.roomText, selectedRoom==item.id?styles.textActive:{}]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    const getFavoriteAppliances = () => {
        const favorites: any[] = [];
        if(homeDetials && Array.isArray(homeDetials)) {
            homeDetials.forEach((floor: any) => {
                floor.rooms?.forEach((room: any) => {
                    room.appliance?.forEach((app: any) => {
                        if(favoriteApplianceIds.includes(app.id)) {
                            favorites.push(app);
                        }
                    });
                });
            });
        }
        return favorites;
    };

    const getFloorsWithSelected = () => {
        if(favoriteApplianceIds.length > 0) {
            return [
                { id: SELECTED_FLOOR_ID, name: 'Selected' },
                ...(homeDetials || [])
            ];
        }
        return homeDetials || [];
    };

    const getSelectedFloorRooms = () => {
        if(selectedFloor === SELECTED_FLOOR_ID) {
            return [{ id: FAVORITE_ROOM_ID, name: 'Favorite', appliance: getFavoriteAppliances() }];
        }
        if(homeDetials) {
            const floor = homeDetials.filter(item=>item.id==selectedFloor);
            return floor.length>0?floor[0].rooms:[]
        }
       return []
    }

    const renderAppliance = ({item}) => {
        const isFavorite = favoriteApplianceIds.includes(item.id);
        return (
            <TouchableOpacity 
                activeOpacity={1} 
                style={[styles.applianceContainer, styles.shadowBox]} 
                onPress={() => handleToggleSwitch(item.id, item.value)}
                onLongPress={() => handleLongPress(item.id)}
            >
                <View style={item.value === "LOW"?styles.on:styles.off}></View>
                {isFavorite && (
                    <View style={styles.favoriteIcon}>
                        <Text style={styles.starIcon}>★</Text>
                    </View>
                )}
                <View style={styles.applianceHeader}>
                    <View style={styles.applianceIconContainer}>
                        <Appliance width={mvs(60)} height={mvs(60)} fill={colors.Text} />
                    </View>
                    
                    {/* <View style={styles.switchContainer}> */}
                        {/* <Switch
                            style={[{ transform: [{ scaleX: Platform.OS == 'ios'?.5:1 }, { scaleY: Platform.OS == 'ios'?.5:1 }] }]}
                            trackColor={{ false: colors.Border, true: colors.Button.Primary }}
                            thumbColor={colors.TextWhite}
                            onValueChange={() => handleToggleSwitch(item.id, item.value)}
                            value={item.value === "LOW"}
                        /> */}
                    {/* </View> */}
                </View>
                <Text style={styles.applianceName}>{item.appliance_name}</Text>
            </TouchableOpacity>
        )
    }

    const renderCreateButton = () => {
        if(getSelectedFloorRooms().length>0){
            return <CustomButton showIcon={true} title={translations.homeScreen.addDevice} buttonStyle={styles.button} onPress={()=>{
                dispatch(initiateAddDeviceFlow(getSelectedFloorRooms().filter(item=>item.id==selectedRoom)[0]))
            }}/>
        }else{
            return (<>
            <Text style={styles.text}>Pease Add Room</Text>
            {/* <CustomButton showIcon={true} title={translations.homeScreen.addDevice} buttonStyle={styles.button} onPress={()=>{
                dispatch(initiateAddDeviceFlow(getSelectedFloorRooms().filter(item=>item.id==selectedRoom)[0]))
            }}/> */}
            </>)
        }
    }
    return (
        <SafeAreaView style={styles.containr}>
            <View style={styles.headerContainer}>
                <DropDown data={homes} onSelect={(item)=>{setSelectedHoom(item.id)}}/>
                <View style={styles.iconContainer}>
                    <Bot width={mvs(48)} height={mvs(48)} fill={colors.Text} stroke={colors.Text} />
                    <AlertIcon width={mvs(48)} height={mvs(48)}   stroke={colors.Text}/>
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
                <Text style={styles.text}>All Devices</Text>
                <Vector width={mvs(20)} height={mvs(20)} fill={colors.Text} stroke={colors.Text} />
            </View>
            <Vrs height={vs(20)}/>
            <View style={styles.floorListContainer}>
                <FlatList
                    data={getFloorsWithSelected()}
                    renderItem={renderFloor}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.floorListContainer} // Adjusted styles to remove blank space
                />
            </View>
            {/* <Vrs height={vs(10)}/> */}
            <View style={styles.roomListContainer}>
                <FlatList
                    data={getSelectedFloorRooms()}
                    renderItem={renderRooms}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.roomListContainer} // Adjusted styles to remove blank space
                />
            </View>
            <Vrs height={vs(20)}/>
            <View style={styles.devicesContainer}>
                {getSelectedFloorRooms().filter(room => room.id === selectedRoom)[0]?.appliance?.length > 0 ? (
                    <FlatList 
                        data={getSelectedFloorRooms().filter(room => room.id === selectedRoom)[0].appliance}
                        renderItem={renderAppliance}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        numColumns={4}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.applianceList}
                        maxToRenderPerBatch={6}
                        windowSize={5}
                        scrollEnabled={true}
                    />
                ) : (
                    <View style={styles.detailContainer}>
                        <View style={styles.noDataContainer}>
                            <NoData width={mvs(120)} height={mvs(117)} fill={colors.Text}/>
                        </View>
                        <View style={styles.detailContainer}>
                            <Vrs height={vs(20)}/>
                            <Text style={styles.text}>No Device</Text>
                            <Vrs height={vs(20)}/>
                            <Text style={styles.text}>You haven't added a device yet.</Text>
                        </View>
                        <Vrs height={vs(20)}/>
                        <View style={styles.buttonContainer}>
                            {renderCreateButton()}
                        </View>
                    </View>
                )}
            </View>
            <View style={styles.buttonGroupContainer}>
                <TouchableOpacity style={[styles.roundButtonContainer, {backgroundColor: colors.Border}]}>
                    <MicIcon width={mvs(28)} height={mvs(28)} fill={colors.Button.Primary}  />
                </TouchableOpacity>
                {getSelectedFloorRooms().filter(room => room.id === selectedRoom)[0]?.appliance?.length > 0 ? (
                <TouchableOpacity style={[styles.roundButtonContainer, {backgroundColor: colors.Button.Primary}]} onPress={()=>{
                    dispatch(initiateAddDeviceFlow(getSelectedFloorRooms().filter(item=>item.id==selectedRoom)[0]))
                }}>
                    <Add width={mvs(28)} height={mvs(28)} fill={colors.TextWhite} />
                </TouchableOpacity>):null}
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
        // paddingVertical: 0,
        margin:0,
        paddingLeft: s(10),
        paddingRight: s(10),
        // height: vs(20),
        // width: deviceWidth(),
        // alignItems: 'center'
    },
    floorContainer:{
        width: 100,
        // height:vs(20),
        backgroundColor: colors.Border,
        // borderTopStartRadius: s(20),
        borderTopEndRadius: s(35),
        borderBottomStartRadius: s(35),
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:s(10),
        paddingVertical: s(5),
        borderColor:colors.Border,
        borderWidth:1,
        marginRight: s(10),
    },
    floorText:{
        fontSize: mvs(12),
        color: colors.Text
    },
    roomListContainer: {
        // height: vs(50),
        // paddingVertical: 0,
        // margin:0,
        paddingLeft: s(20),

        // width: deviceWidth(),
        marginTop: vs(5),
        // backgroundColor: 'red',
        // alignItems:'center',
        // overflow:'visible'
    },
    roomContainer: {
        // height: vs(30),
        // width: s(100),
        paddingVertical: 5,
        paddingHorizontal: 30,
        flexDirection:'row',
        backgroundColor: colors.Primary,
        alignItems: 'center',
        justifyContent:'center',
        // paddingHorizontal:15,
        borderTopEndRadius: s(50),
        borderBottomStartRadius: s(50),
        borderColor: colors.Border,
        // paddingRight: s(20),
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
        shadowOffset: { width: 0, height: 1 }, // The shadow’s position
        shadowOpacity: 0.1, // Transparency of the shadow
        shadowRadius: 1, // Softness of the shadow
        elevation: 4, // For Android devices, to orchestrate the shadow’s depth
    },
    devicesContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: s(10),
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
        height: vs(36),
        marginLeft: s(20),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:'flex-end',
        position:'absolute',
        bottom:0,
        paddingBottom: 16,
    },
    roundButtonContainer: {
        height: vs(56),
        width: vs(56),
        marginRight: s(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: vs(28)
    },
    text:{
        color: colors.Text
    },
    active:{
        backgroundColor: colors.Button.Primary
    },
    textActive: {
        color: colors.TextWhite
    },
    applianceContainer: {
        // flex: 1,
        // height: vs(150),
        // width: s(150),
        backgroundColor: colors.Secondary,
        // backgroundColor:'red',
        margin: s(10),
        borderRadius: s(5),
        padding: s(7.5),
        borderWidth: 1,
        borderColor: colors.Border,
        justifyContent: 'space-between',
        alignItems: 'center',
        // maxWidth: '50%',
    },
    applianceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    applianceIconContainer: {
        // width: s(40),
        // height: s(40),
        // borderRadius: s(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    applianceName: {
        color: colors.Text,
        fontSize: mvs(12),
        fontWeight: 'bold',
        marginTop: vs(15),
        width: s(50),
        textAlign: 'center',
    },
    applianceStatus: {
        color: colors.Text,
        fontSize: mvs(12)
    },
    applianceList: {
        paddingBottom: vs(80), // Add padding for bottom buttons
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    switchContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    on: {
        width: s(10),
        height: s(10),
        backgroundColor: colors.Button.Primary,
        borderRadius: s(5),
        position: 'absolute',
        top: s(5),
        right: s(5),
        // borderWidth: 1,
        // borderColor: colors.Border,
    },
    off: {
        width: s(10),
        height: s(10),
        backgroundColor: colors.Border,
        borderRadius: s(5),
        position: 'absolute',
        top: s(5),
        right: s(5),
        // borderWidth: 1,
        // borderColor: colors.Border,
    },
    favoriteIcon: {
        position: 'absolute',
        top: s(5),
        left: s(5),
        zIndex: 10,
    },
    starIcon: {
        color: '#FFD700',
        fontSize: mvs(16),
        fontWeight: 'bold',
    },
    
})