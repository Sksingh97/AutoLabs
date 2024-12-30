import { useContext, useState } from "react"
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ThemeContext } from "../provider/theme"
import { s, vs } from "react-native-size-matters/extend";
import { deviceWidth } from "../utils/helper";

const GroupButton = ({buttons=[]}) => {
    const { colors, translations } = useContext(ThemeContext);
    const [ selectedButton, setSelectedButton ] = useState(0);
    const styles = getStyles(colors);
    return (
        <View style={styles.container}>
            {buttons.map((button, index) => (
                <TouchableOpacity key={`GROUP_BUTTON_${index}`} style={[styles.buttonContainer, selectedButton==index?styles.activeButton:{}]} onPress={()=>{
                    setSelectedButton(index)
                    button.onPress()}}>
                    <Text style={[styles.text, selectedButton==index?styles.activeText:{}]}>{button.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default GroupButton

const getStyles = (colors) => StyleSheet.create({
    container:{
        width : '90%',
        height: vs(50),
        flexDirection:'row',
        backgroundColor: colors.Border,
        borderRadius: 5
    },
    buttonContainer:{
        // backgroundColor: 'red',
        height: vs(50),
        width: deviceWidth()/2-20,
        justifyContent:'center',
        alignItems: 'center',
        
    },
    activeButton:{
        backgroundColor: colors.Button.Primary,
        color: colors.TextWhite,
        borderRadius: 5
    },
    text:{
        color: colors.Text,
        fontWeight: 'bold'
    },
    activeText: {
        color: colors.TextWhite
    }
})