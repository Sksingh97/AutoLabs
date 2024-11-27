import { Button, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useContext, useEffect, useState } from "react";
import { ThemeContext, ThemeProvider } from "../../../provider/theme";
import { Close, WellDoneImage} from "../../../constants/images";
import Heading from "../../../components/heading";
import SetupHeading from "../../../components/setupHeading";
import SetupHeader from "../../../components/setupHeader";
import Vrs from "../../../components/verticalSpacer";
import CustomButton from "../../../components/button";
import { deviceHeight, deviceWidth, scaleSize } from "../../../utils/helper";

const WellDone = ({route, navigation}:any) => {
    const {colors, translations} = useContext(ThemeContext)
    const { noOfSteps, currentStep} = route.params;
    const styles = getStyles(colors);

    const renderBack =() =>{
        return (
            <TouchableOpacity onPress={()=>{navigation.pop();}}>
                <Close width={25} height={25} fill={colors.Text} stroke={colors.Text} />
            </TouchableOpacity>
        )
    }


    const goToNextScreen = (id) => {
        navigation.push('Home', {noOfSteps:noOfSteps, currentStep:1+currentStep, parentId: id})
    }
    const renderStepCount =()=><Text> {currentStep} / {noOfSteps} </Text>

    console.log("platform",Platform.OS, scaleSize(50))
    return (
        <View style={styles.containr}>
            <SetupHeader
            LeftIcons={[renderBack]}
            RightIcons={[]}
            // noOfStep={noOfSteps}
            // currentStep={currentStep}
            />
            <Vrs height={scaleSize(50)}/>
            <View style={styles.wellDoneContainer}>
                <View style={styles.imageContainer}>
                    <WellDoneImage width={scaleSize(50)} height={scaleSize(50)} fill={colors.Text} stroke={colors.Text} />
                </View>
                <View style={styles.messageContainer}>
                    <Text>
                        {translations.setupScreen.wellDone.title}
                    </Text>
                    <Text>
                        {translations.setupScreen.wellDone.message}
                    </Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                {/* <CustomButton title={translations.setupScreen.back} isDisabled={currentStep==1}  buttonStyle={styles.button} onPress={()=>{navigation.pop()}}/> */}
                <CustomButton title={translations.setupScreen.room.done} buttonStyle={styles.button} onPress={()=>{navigation.push('CreateFloor', {noOfSteps, currentStep:1+currentStep})}}/>
            </View>
            
        </View>
    )
}

export default WellDone;

const getStyles = (colors:any) => StyleSheet.create({
    containr:{
        backgroundColor: colors.Primary,
        flex:1,
        alignItems:'center',
        // justifyContent:'center'
    },
    wellDoneContainer:{
        width: "80%",
        height: scaleSize(150),
        backgroundColor:'red'
    },
    imageContainer:{
        width:'100%',
        marginTop:scaleSize(10),
        alignItems:'center'
    },
    messageContainer:{
        width: deviceWidth()-75,
        marginTop:scaleSize(10),
        height: scaleSize(60),
        alignItems: 'center',
        justifyContent:'space-between',
        padding: 20,
        backgroundColor:'yellow'
    },
    buttonContainer:{
        width:'100%',
        flexDirection:'row', 
        justifyContent:'space-between', 
        paddingHorizontal:20,
        position: 'absolute',
        bottom:20
    },
    button:{
        width:deviceWidth()-40,
    },
})