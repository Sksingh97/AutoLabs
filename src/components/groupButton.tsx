import { useContext } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { ThemeContext } from "../provider/theme"
import { s, vs } from "react-native-size-matters/extend";
import { deviceWidth } from "../utils/helper";

const GroupButton = ({buttons=[]}) => {
    const { colors, translations } = useContext(ThemeContext);
    const styles = getStyles(colors);
    return (
        <View style={styles.container}>
            <View style={[styles.buttonContainer, styles.activeButton]}>
                <Text style={[styles.text, styles.activeText]}>Nearby Devices</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>Nearby Devices</Text>
            </View>
        </View>
    )
}

export default GroupButton

const getStyles = (colors) => StyleSheet.create({
    container:{
        width : '90%',
        height: vs(50),
        flexDirection:'row',
        backgroundColor: colors.Border
    },
    buttonContainer:{
        // backgroundColor: 'red',
        height: vs(50),
        width: deviceWidth()/2-20,
        justifyContent:'center',
        alignItems: 'center'
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