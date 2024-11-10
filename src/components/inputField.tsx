import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { useContext, useState }from "react";
import { ThemeContext } from "../provider/theme";
import { Email, Hide, Show, Lock } from "../constants/images";
import { deviceWidth } from "../utils/helper";
import ProtoType from "prop-types"

const InputField = ({label, showRightIcon, isSecure, hasError, isMandatory, error, keyboardType="default", placeHolder="", onChange=()=>{}, maxLength}:any) => {
    const [secureText, setSecureText] = useState(isSecure)
    const { colors } = useContext(ThemeContext)
    const styles = getStyles(colors);
    const getIconByLabel=()=>{
        switch(label) {
            case "Email":
                return <Email width={20} height={20} fill={colors.Text} stroke={colors.Text}/>
            case "Password":
                return <Lock width={20} height={20} fill={colors.Text} stroke={colors.Text}/>
        }
    }
    return (
        <View style = {styles.container}>
            <View style={styles.lableContainer}>
                <Text>{label} {isMandatory?'*':''}</Text>
            </View>
            <View style={styles.fieldContainer}>
                <View>
                    {getIconByLabel()}
                </View>
                <View>
                    <TextInput maxLength={maxLength} style={styles.inputField} placeholder={placeHolder} secureTextEntry ={secureText} keyboardType={keyboardType} onChangeText={onChange}/>
                </View>
                {showRightIcon&&<View>
                    <TouchableOpacity onPress={()=>{
                        setSecureText(!secureText)
                    }}>
                        {
                        secureText?
                        <Show width={20} height={20} fill={colors.Text} stroke={colors.Text}/>
                        :
                        <Hide width={20} height={20} fill={colors.Text} stroke={colors.Text}/>
                        }
                    </TouchableOpacity>
                </View>}
            </View>
            {hasError&&<View style={styles.fieldErrorContainer}>
                <Text style={styles.errorText}>* {error}</Text>
            </View>}
        </View>
    )
}

InputField.prototype = {
    label: ProtoType.string.isRequired, 
    showRightIcon: ProtoType.bool, 
    isSecure: ProtoType.bool, 
    hasError: ProtoType.bool, 
    isMandatory: ProtoType.bool, 
    error: ProtoType.string, 
    keyboardType: ProtoType.string, 
    placeHolder: ProtoType.string, 
    onChange: ProtoType.func.isRequired,
    maxLength: ProtoType.number
}

InputField.defaultProps = {
    label:"", 
    showRightIcon: false, 
    isSecure: false, 
    hasError: false, 
    isMandatory: false, 
    error:"", 
    keyboardType:"default", 
    placeHolder:"", 
    onChange:()=>{},
    maxLength: 50
}

export default InputField;

const getStyles = (colors:any) => StyleSheet.create({
    container:{
        paddingHorizontal:20,
        backgroundColor: colors.Primary,
        height: 102,
        width: '100%'
    },
    lableContainer:{
        height: 29,
        width:'100%',
        justifyContent: 'center',
    },
    fieldContainer:{
        backgroundColor: colors.Secondary,
        height: 65,
        marginTop: 8,
        borderRadius: 10,
        padding:20,
        flexDirection:'row',
        alignItems:'center'
    },
    inputField:{
        width: deviceWidth()-120,
        paddingHorizontal: 10,
        height: 40,
        textAlignVertical:'center'
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
    }
})