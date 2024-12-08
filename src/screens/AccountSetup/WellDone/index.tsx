import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useContext } from "react";
import { ThemeContext } from "../../../provider/theme";
import { Close, WellDoneImage} from "../../../constants/images";
import SetupHeader from "../../../components/setupHeader";
import Vrs from "../../../components/verticalSpacer";
import CustomButton from "../../../components/button";
import { deviceWidth, scaleFont, scaleSize } from "../../../utils/helper";
import { useDispatch } from "react-redux";
import { updateAuthLoginStepRequest } from "../../../store/actions/authAction";

const WellDone = ({route, navigation}:any) => {
    const {colors, translations} = useContext(ThemeContext)
    const { noOfSteps, currentStep} = route.params;
    const styles = getStyles(colors);
    const dispatch = useDispatch();
    const renderBack =() =>{
        return (
            <TouchableOpacity onPress={updateLoginStep}>
                <Close width={25} height={25} fill={colors.Text} stroke={colors.Text} />
            </TouchableOpacity>
        )
    }

    const updateLoginStep=async ()=>{
        dispatch(updateAuthLoginStepRequest({login_step:4}))
    }

    return (
        <View style={styles.containr}>
            <SetupHeader
            LeftIcons={[renderBack]}
            RightIcons={[]}
            />
            <Vrs height={scaleSize(50)}/>
            <View style={styles.wellDoneContainer}>
                <View style={styles.imageContainer}>
                    <WellDoneImage width={scaleSize(50)} height={scaleSize(50)} fill={colors.Text} stroke={colors.Text} />
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.title}>
                        {translations.setupScreen.wellDone.title}
                    </Text>
                    <Text style={styles.message}>
                        {translations.setupScreen.wellDone.message}
                    </Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton title={translations.setupScreen.wellDone.getStarted} buttonStyle={styles.button} onPress={updateLoginStep}/>
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
        width: deviceWidth()
    },
    wellDoneContainer:{
        width: "80%",
        height: scaleSize(150),
    },
    imageContainer:{
        width:'100%',
        marginTop:scaleSize(10),
        alignItems:'center'
    },
    messageContainer:{
        width: "100%",
        marginTop:scaleSize(10),
        height: scaleSize(60),
        alignItems: 'center',
        paddingTop:20,
    },
    title:{
        fontSize: scaleFont(30),
        fontWeight: 'bold'
    },
    message:{
        fontSize: scaleFont(15),
        textAlign: 'center',
        marginTop:10
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