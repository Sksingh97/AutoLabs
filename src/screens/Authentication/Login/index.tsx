import { View, Text, TouchableOpacity, StyleSheet, Switch} from "react-native"
import { useContext, useState } from "react"
import Header from "../../../components/header"
import { LeftArrow } from "../../../constants/images"
import { ThemeContext } from "../../../provider/theme"
import Heading from "../../../components/heading"
import InputField from "../../../components/inputField"
import Vrs from "../../../components/verticalSpacer"
import CustomButton from "../../../components/button"
import { validateIndianPhoneNumber } from "../../../utils/helper"
import { useDispatch } from "react-redux"
import { loginOtpRequest } from "../../../store/actions/authAction"


const Login = ({navigation}:any) => {
    const { colors, translations} = useContext(ThemeContext)
    const [ phone, setPhoneNumber ] = useState("")
    const [ phoneError, setPhoneError ] = useState("")
    const styles = getStyles(colors);
    const dispatch = useDispatch();

    const renderBack =() =>{
        return (
            <TouchableOpacity onPress={()=>{navigation.pop();}}>
                <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text} />
            </TouchableOpacity>
        )
    }
    const sendOtp = () => {
        const _phone = phone;
        let hasError = false;
        if(_phone.trim().length==0){
            setPhoneError(translations.loginScreen.errors.phoneIsRequired)
            hasError = true;
        }
        if(!validateIndianPhoneNumber(_phone)){
            setPhoneError(translations.loginScreen.errors.phoneInvalid)
            hasError = true;
        }
        if(!hasError){
            dispatch(loginOtpRequest({mobile_number: _phone}))
        }
    }

    const onPhoneChange = (text:string) => {
        if(phoneError.length>0){
            setPhoneError("")
        }
        setPhoneNumber(text);
    }


    return (
    <View style={styles.container}>
        <Header
         LeftIcons={[renderBack]}
         />
        <Heading message={translations.loginScreen.message} subMessage={translations.loginScreen.subMessage}/>
        <Vrs height={40}/>
        <InputField label={translations.loginScreen.phone} keyboardType={"numeric"} placeHolder={"XXXXXXXXXX"} onChange={onPhoneChange} hasError={phoneError.length>0} error={phoneError}/>
        <Vrs height={30}/>
        
        <Vrs height={265}/>
        <CustomButton title={translations.loginScreen.sendOtp} type={"Primary"} onPress={sendOtp}/>
    </View>
    )
}

export default Login;

const getStyles = (colors:any) => StyleSheet.create({
    container: {
        backgroundColor: colors.Primary,
        flex:1
    },
    forgetMainContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        height:40,
        alignItems: 'center'
    },
    rememberMeContainer:{
        flexDirection: 'row',
        height: 40,
        alignItems:'center'
    },
    checkboxText:{
        color:colors.Text,
        marginLeft: 10
    },
    forgetPasswordText:{
        color: colors.Button.Primary
    },

})