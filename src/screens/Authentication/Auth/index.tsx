import { Button, StyleSheet, Text, View } from "react-native"
import { useContext } from "react"
import { ThemeContext } from "../../../provider/theme"
import Header from "../../../components/header"
import { LeftArrow } from "../../../constants/images"
import LogoBaner from "../../../components/logoBaner"
import Heading from "../../../components/heading"
import SocialLoginButton from "../../../components/socialLoginButton"
import Vrs from "../../../components/verticalSpacer"
import CustomButton from "../../../components/button"
import { TouchableOpacity } from "react-native-gesture-handler"

const Auth = ({ navigation, route, options, back }:any) => {
    const {language, theme, translations, colors} = useContext(ThemeContext)
    const styles = getStyle(colors)

    const renderBack =() =>{
        return (
            <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text}/>
        )
    }
    const goToPrivacyPolicy=()=>{
        navigation.push('PrivacyPolicy', {})
    }
    const goToTermOfService=()=>{
        navigation.push('TermOfService', {})
    }
    const goToSignUp=()=>{
        navigation.push('SignUp', {})
    }
    const goToLogin=()=>{
        navigation.push('Login', {})
    }

    return (
        <View style={styles.containr}>
            <LogoBaner/>
            <Vrs height={20}/>
            <Heading message={translations.startScreen.heading} subMessage={translations.startScreen.subHeading}/>
            <Vrs height={120}/>
            <CustomButton title={translations.startScreen.signUp} type={"Primary"} onPress={goToSignUp} buttonStyle={{}}/>
            <Vrs height={20}/>
            <CustomButton title={translations.startScreen.signIn} type={"Primary"} onPress={goToLogin} buttonStyle={{}}/>
            <View style={styles.policyContainer}>
                <TouchableOpacity onPress={goToPrivacyPolicy}><Text>{translations.startScreen.privacyPolicy}</Text></TouchableOpacity>
                <View><Text> - </Text></View>
                <TouchableOpacity onPress={goToTermOfService}><Text>{translations.startScreen.termsOfService}</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default Auth;

const getStyle = (colors:any) => StyleSheet.create({
    containr:{
        flex:1,
        backgroundColor: colors.Primary
    },
    policyContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 40
    }
})