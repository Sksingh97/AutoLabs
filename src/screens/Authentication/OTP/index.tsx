import { View, Text, TouchableOpacity, StyleSheet, Switch} from "react-native"
import { useContext, useEffect, useState } from "react"
import Header from "../../../components/header"
import { LeftArrow } from "../../../constants/images"
import { ThemeContext } from "../../../provider/theme"
import Heading from "../../../components/heading"
import InputField from "../../../components/inputField"
import Vrs from "../../../components/verticalSpacer"
import CustomButton from "../../../components/button"
import CustomCheckBox from "../../../components/checkBox"
import OtpInput from "../../../components/otpInput"
import { OTP_LENGTH, OTP_RESEND_TIMER, USER_DETAILS_KEY } from "../../../utils/constants"
import { useDispatch } from "react-redux"
import StorageService from '../../../services/localStorageService';
import { signupVerifyRequest,signupResendOTP, loginOtpRequest, loginVerifyRequest } from "../../../store/actions/authAction"

const OTP = ({route, navigation}:any) => {
    const { name, mobile_number, is_login } = route.params;
    const { colors, translations} = useContext(ThemeContext)
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [otpError, setOtpError] = useState("")
    const styles = getStyles(colors);
    const dispatch = useDispatch();
    const [time, setTime] = useState(OTP_RESEND_TIMER);
    const [rememberMe, setRememberMe] = useState(false);
    useEffect(() => {
        if (time <= 0) return;
        const interval = setInterval(() => {
          setTime(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(interval);
      }, [time]);
    const formatTime = (time:number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const renderBack =() =>{
        return (
            <TouchableOpacity onPress={()=>{navigation.pop();}}>
                <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text} />
            </TouchableOpacity>
        )
    }

    const createAccount = () => {
        const _name = name;
        const _phone = mobile_number;
        const _otp = otp.join('').trim()
        if(_otp.length < OTP_LENGTH){
            setOtpError(translations.loginScreen.invalidOtp.replaceAll("{digit}", OTP_LENGTH))
            return;
        }
        if(rememberMe){
            StorageService.storeData(USER_DETAILS_KEY, {mobile_number: _phone, name:name})
        }
        if(is_login){
            dispatch(loginVerifyRequest({name: _name, mobile_number: _phone, otp_value: _otp}))
        }else{
            dispatch(signupVerifyRequest({name: _name, mobile_number: _phone, otp_value: _otp}))
        }
        
    }

    const onOtpChange = (text:string, index:number) => {
        const _tempOtp = otp
        _tempOtp[index] = text;
        if(otpError.length>0) {
            setOtpError("")
        }
        setOtp([..._tempOtp])
    }

    const ResendOtp = () => {
        setTime(OTP_RESEND_TIMER);
        if(is_login){
            dispatch(loginOtpRequest({mobile_number: mobile_number}))
        } else {
            dispatch(signupResendOTP({name:name, mobile_number: mobile_number}))
        }
    }

    const onRemeberMeChange = (value:boolean) => {
        setRememberMe(value);
    }

    return (
    <View style={styles.container}>
        <Header
         LeftIcons={[renderBack]}
         />
        <Heading message={translations.loginScreen.otpHeading} subMessage={translations.loginScreen.otpSubHeading.replaceAll("{name}", name).replaceAll("{number}", mobile_number)}/>
        <View style={styles.editNumberContainer}>
            <TouchableOpacity onPress={()=>{navigation.pop();}}>
                <Text style={styles.forgetPasswordText}>{translations.loginScreen.updateMobileNumber}</Text>
            </TouchableOpacity>
        </View>
        <OtpInput label={""} length={OTP_LENGTH} onChange={onOtpChange}/>
        {otpError.length>0?<View style={styles.fieldErrorContainer}>
            <Text style={styles.errorText}>* {otpError}</Text>
        </View>:<Vrs height={20}/>}
        <View style={styles.forgetMainContainer}>
            <View style={styles.rememberMeContainer}>
                <CustomCheckBox onChange={onRemeberMeChange}/>
                <Text style={styles.checkboxText}>{translations.loginScreen.rememberMe}</Text>
            </View>
            {time>0?<View style={styles.countDownTimerContainer}><Text style={styles.coundownTimerText}>{translations.loginScreen.resendCountDown}</Text><Text style={styles.coundownTimerText}> {formatTime(time)}</Text></View>:<View>
                <TouchableOpacity onPress={ResendOtp}>
                    <Text style={styles.forgetPasswordText}>{translations.loginScreen.resendOtp}</Text>
                </TouchableOpacity>
            </View>}
        </View>
        <Vrs height={120}/>
        <CustomButton title={translations.loginScreen.submitOtp} type={"Primary"} onPress={createAccount} buttonStyle={{}} isDisabled={otp.join("").trim().length<OTP_LENGTH}/>
    </View>
    )
}

export default OTP;

const getStyles = (colors:any) => StyleSheet.create({
    container: {
        backgroundColor: colors.Primary,
        flex:1,
    },
    editNumberContainer:{
        paddingHorizontal:20,
        alignItems:"flex-end"
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
    fieldErrorContainer:{
        height: 20,
        width: '100%',
        paddingHorizontal:20,
        textAlignVertical:'center'
    },
    errorText:{
        fontSize:14,
        color:'red'
    },
    countDownTimerContainer:{
        width: "45%",
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    coundownTimerText: {
        color: colors.Text
    }

})