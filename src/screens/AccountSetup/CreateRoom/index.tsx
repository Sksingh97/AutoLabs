import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Header from "../../../components/header";
import { useContext } from "react";
import { ThemeContext, ThemeProvider } from "../../../provider/theme";
import { LeftArrow } from "../../../constants/images";
import Heading from "../../../components/heading";
import SetupHeading from "../../../components/setupHeading";
import SetupHeader from "../../../components/setupHeader";
import InputField from "../../../components/inputField";
import Vrs from "../../../components/verticalSpacer";
import CustomButton from "../../../components/button";
import { deviceHeight, deviceWidth } from "../../../utils/helper";

const CreateRoom = ({route, navigation}:any) => {
    const {colors, translations} = useContext(ThemeContext)
    const { noOfSteps, currentStep} = route.params;
    const styles = getStyles(colors);
    const renderBack =() =>{
        return (
            <TouchableOpacity onPress={()=>{navigation.pop();}}>
                <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text} />
            </TouchableOpacity>
        )
    }

    const renderAddHomeName = () => {
        return (
            <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>
                        {translations.setupScreen.home.add}
                    </Text>
                    <Text style={styles.headingHylightedText}>
                        {translations.setupScreen.room.room}
                    </Text>
                    <Text style={styles.headingText}>
                        {translations.setupScreen.home.name}
                    </Text>
            </View>
        )
    }
    const renderStepCount =()=><Text> {currentStep} / {noOfSteps} </Text>
    return (
        <View style={styles.containr}>
            <SetupHeader
            LeftIcons={[renderBack]}
            RightIcons={[renderStepCount]}
            noOfStep={noOfSteps}
            currentStep={currentStep}
            />
            <SetupHeading message={renderAddHomeName} subMessage={translations.setupScreen.home.subHeading}/>
            <Vrs height={20}/>
            <InputField placeHolder={`${translations.setupScreen.home.home} ${translations.setupScreen.home.name}`}/>
            <View style={styles.buttonContainer}>
                <CustomButton title={translations.setupScreen.back} isDisabled={currentStep==1}  buttonStyle={styles.button} onPress={()=>{navigation.pop()}}/>
                <CustomButton title={translations.setupScreen.save} buttonStyle={styles.button} onPress={()=>{navigation.push('CreateFloor', {noOfSteps, currentStep:1+currentStep})}}/>
            </View>
            
        </View>
    )
}

export default CreateRoom;

const getStyles = (colors:any) => StyleSheet.create({
    containr:{
        backgroundColor: colors.Primary,
        flex:1
    },
    headingContainer:{
        flexDirection:'row',
        justifyContent:'center',
        width:'100%',
    },
    headingText: {
        fontSize: 24,
        color: colors.Text,
        fontWeight: "bold",
    },
    headingHylightedText: {
        fontSize: 24,
        color: colors.Button.Primary,
        fontWeight: "bold",
        marginLeft: 8,
        marginRight:8
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
        width:150
    }
})