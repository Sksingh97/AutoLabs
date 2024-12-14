import {View, Text, StyleSheet} from "react-native"
import { Google, Facebook } from "../constants/images";
import { useContext } from "react";
import { ThemeContext } from "../provider/theme";
import PropTypes, { string } from 'prop-types';
import fontSize from "../constants/fontSize";
import { TouchableOpacity } from "react-native-gesture-handler";

const SocialLoginButton = ({social="Google", onPress=()=>{}}:any) => {
    const { colors, translations } = useContext(ThemeContext)
    const styles = getStyle(colors)
    const renderSocialAuthImage = (social:string) => {
        switch (social) {
            case 'Google':
                return  <Google/>
            case 'Facebook':
                return <Facebook/>
            default:
                return <Google/>            
        }
    }

    const getButtonText = (social:string)=> {
        switch (social) {
            case 'Google':
                return  translations.startScreen.googleSignIn
            case 'Facebook':
                return translations.startScreen.fbSignIn
            default:
                return translations.startScreen.googleSignIn
        }
    }
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.imageContainer}>
               {renderSocialAuthImage(social)}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{getButtonText(social)}</Text>
            </View>
            <View style={styles.imageContainer}/>
        </TouchableOpacity>
    )
}

SocialLoginButton.protoType = {
    social: PropTypes.oneOf(['Google', 'Facebook']).isRequired,
    subMessage: PropTypes.string.isRequired
}


export default SocialLoginButton;

const getStyle = (colors:any) => StyleSheet.create({
    container: {
        width:"95%",
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems:'center',
        height:45,
        padding:10,
        marginLeft:10,
        marginRight:10,
        borderWidth:1,
        borderRadius:22,
        backgroundColor: colors.Secondary,
        borderColor: colors.Border
    },
    imageContainer:{
        width: 30,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
    },
    textContainer:{
        width:'81%',
        alignItems:'center',
        justifyContent: 'center'
    },
    text:{
        color: colors.Text,
        fontSize: fontSize.H3
    }
})