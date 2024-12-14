import {View, Text, StyleSheet} from "react-native"
import { ThemeContext } from "../provider/theme"
import { useContext } from "react"
import PropTypes from 'prop-types';
import fontSize from "../constants/fontSize";
import Vrs from "./verticalSpacer";

const Heading = ({message="", subMessage=""}:any) => {
    const {colors} = useContext(ThemeContext)
    const styles = getStyle(colors)
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.message}>{message}</Text>
            </View>
            <Vrs height={10}/>
            {subMessage && <View style={styles.subContainer}>
                <Text style={styles.subMessage}>{subMessage}</Text>
            </View>}
        </>
        
    )
}

Heading.protoType = {
    message: PropTypes.string.isRequired,
    subMessage: PropTypes.string.isRequired
}


export default Heading

const getStyle = (colors:any) => StyleSheet.create({
    container:{
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer:{
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20
    },
    message: {
        color: colors.Text,
        fontSize: fontSize.H1,
        fontWeight: '500'
    },
    subMessage: {
        color: colors.Text,
        fontSize: fontSize.H3,
        fontWeight: '300'
    }
})