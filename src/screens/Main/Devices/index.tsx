import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Switch, Platform } from "react-native"
import { deviceHeight, deviceWidth } from "../../../utils/helper";
import { vs, s, mvs } from 'react-native-size-matters/extend';
import { Add, AlertIcon, Bot, Device, NoData, Vector } from "../../../constants/images";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../../provider/theme";
import { useDispatch, useSelector } from "react-redux";
import Vrs from "../../../components/verticalSpacer";
import CustomButton from "../../../components/button";
import React from "react";

const Devices = ({route, navigation}:any) => {
    const {colors, translations} = useContext(ThemeContext);
    const { homes, homeDetials } = useSelector((state:any) => state.home);
    const styles = getStyles(colors);
    const dispatch = useDispatch();

    const renderDevice = ({item}) => {
        return (
            <TouchableOpacity style={[styles.deviceContainer, styles.shadowBox]}>
                <View style={styles.deviceIconContainer}>
                    <Device width={mvs(48)} height={mvs(48)} fill={colors.Text} />
                </View>
                <View style={styles.deviceInfo}>
                    <Text style={styles.deviceName}>{item.name}</Text>
                    <Text style={styles.deviceStatus}>{item.status}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>My Devices</Text>
                <View style={styles.iconContainer}>
                    <Bot width={mvs(48)} height={mvs(48)} fill={colors.Text} stroke={colors.Text} />
                    <AlertIcon width={mvs(48)} height={mvs(48)} stroke={colors.Text}/>
                </View>
            </View>
            <View style={styles.searchContainer}>
                {/* Search implementation will go here */}
            </View>
            <View style={styles.devicesContainer}>
                <FlatList 
                    data={[]} // Your devices data will go here
                    renderItem={renderDevice}
                    keyExtractor={(item, index) => `device-${index}`}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.devicesList}
                    ListEmptyComponent={() => (
                        <View style={styles.noDeviceContainer}>
                            <NoData width={mvs(120)} height={mvs(117)} fill={colors.Text}/>
                            <Vrs height={vs(20)}/>
                            <Text style={styles.text}>No Devices Found</Text>
                            <Vrs height={vs(20)}/>
                            <Text style={styles.text}>You haven't added any devices yet.</Text>
                            <Vrs height={vs(20)}/>
                            <CustomButton 
                                showIcon={true} 
                                title="Add Device" 
                                buttonStyle={styles.button}
                                onPress={() => {/* Handle add device */}}
                            />
                        </View>
                    )}
                />
            </View>
            <TouchableOpacity 
                style={[styles.fabButton, {backgroundColor: colors.Button.Primary}]}
                onPress={() => {/* Handle add device */}}
            >
                <Add width={mvs(28)} height={mvs(28)} fill={colors.TextWhite} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Devices;

const getStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Primary
    },
    headerContainer: {
        height: vs(72),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: s(20)
    },
    headerText: {
        fontSize: mvs(24),
        fontWeight: 'bold',
        color: colors.Text
    },
    iconContainer: {
        flexDirection: 'row',
        width: s(110),
        justifyContent: 'space-between'
    },
    searchContainer: {
        marginHorizontal: s(20),
        marginVertical: vs(10)
    },
    devicesContainer: {
        flex: 1,
        paddingHorizontal: s(20)
    },
    deviceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: s(15),
        backgroundColor: colors.Secondary,
        borderRadius: s(12),
        marginBottom: vs(10)
    },
    deviceIconContainer: {
        width: s(48),
        height: s(48),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: s(15)
    },
    deviceInfo: {
        flex: 1
    },
    deviceName: {
        fontSize: mvs(16),
        fontWeight: 'bold',
        color: colors.Text
    },
    deviceStatus: {
        fontSize: mvs(14),
        color: colors.Text,
        opacity: 0.7
    },
    devicesList: {
        paddingBottom: vs(80)
    },
    noDeviceContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: vs(100)
    },
    text: {
        color: colors.Text,
        fontSize: mvs(16)
    },
    button: {
        width: s(155),
        height: vs(50)
    },
    fabButton: {
        position: 'absolute',
        bottom: vs(20),
        right: s(20),
        width: s(56),
        height: s(56),
        borderRadius: s(28),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    shadowBox: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 4,
    }
});
