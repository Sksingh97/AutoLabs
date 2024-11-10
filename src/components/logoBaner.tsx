import { useContext } from "react";
import {View, Image, StyleSheet} from "react-native"
import { ThemeContext } from "../provider/theme";
import { isIos } from "../utils/helper";


const LogoBaner = () => {
    const {colors} = useContext(ThemeContext)
    const styles = getStyle(colors);
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/images/logo.png")}/>
        </View>
    )
}

export default LogoBaner
const getStyle = (colors:any) => StyleSheet.create({
    container: {
        marginTop: isIos()?30:0,
        width: "100%",
        height: "20%",
        justifyContent: 'center',
        alignItems:'center'
    },
    logo:{
        height:80,
        width:80,
        resizeMode: 'contain'
    }
}) 