import { View, TouchableOpacity, StyleSheet} from "react-native"
import { useContext, useState } from "react"
import Header from "../../../components/header"
import { LeftArrow } from "../../../constants/images"
import { ThemeContext } from "../../../provider/theme"
import Heading from "../../../components/heading"
import InputField from "../../../components/inputField"
import Vrs from "../../../components/verticalSpacer"
import CustomButton from "../../../components/button"
import { validateIndianPhoneNumber } from "../../../utils/helper"
import { useDispatch, UseDispatch } from "react-redux"
import { authRequest } from "../../../store/actions/authAction"


const SignUp = ({navigation}:any) => {
    const { colors, translations} = useContext(ThemeContext)
    const [ isOtpSent, setIsOtpSent] = useState(true)
    const [ phone, setPhoneNumber ] = useState("")
    const [ phoneError, setPhoneError ] = useState("")
    const [ name,  setName ] = useState("")
    const [ nameError, setNameError ] = useState("")
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
        const _name = name;
        const _phone = phone;
        let hasError = false;
        if(_name.trim().length==0){
            setNameError(translations.loginScreen.errors.nameIsRequired)
            hasError = true;
        }
        if(_phone.trim().length==0){
            setPhoneError(translations.loginScreen.errors.phoneIsRequired)
            hasError = true;
        }
        if(!validateIndianPhoneNumber(_phone)){
            setPhoneError(translations.loginScreen.errors.phoneInvalid)
            hasError = true;
        }
        if(!hasError){
            dispatch(authRequest({name:_name, mobile_number: _phone}))
        }
    }

    const onNameChange = (text:string) => {
        if(nameError.length>0){
            setNameError("")
        }
        setName(text);
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
        <Heading message={translations.loginScreen.signUpMessage} subMessage={translations.loginScreen.signUpSubMessage}/>
        <Vrs height={40}/>
        <InputField label={translations.loginScreen.name} placeHolder={translations.loginScreen.name} onChange={onNameChange} error={nameError} hasError={nameError.length>0}
        />
        <Vrs height={40}/>
        <InputField maxLength={10} label={translations.loginScreen.phone} keyboardType={"numeric"} placeHolder={"XXXXXXXXXX"} onChange={onPhoneChange} error={phoneError} hasError={phoneError.length>0}/>
        <Vrs height={30}/>
        <Vrs height={120}/>
        <CustomButton title={translations.loginScreen.sendOtp} type={"Primary"} onPress={sendOtp} buttonStyle={{}}/>
    </View>
    )
}

export default SignUp;

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