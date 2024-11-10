import {View, Text, StyleSheet} from 'react-native';
import {useContext} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropType from 'prop-types'
import { ThemeContext } from '../provider/theme';
import { deviceWidth } from '../utils/helper';
import fontSize from '../constants/fontSize';

const CustomButton = ({title, type, onPress, buttonStyle, isDisabled}:any) => {
    const {colors} = useContext(ThemeContext)
    const styles = getStyle(colors)
    return (
        <View style={[styles.container, isDisabled?styles.disabled:{}]}>
            <TouchableOpacity style={styles.button} onPress={onPress} disabled={isDisabled}>
                <Text style={styles.text}>{title}</Text>                                                                                                       
            </TouchableOpacity>
        </View>
        
    )
}

CustomButton.propType = {
    title: PropType.string.isRequired,
    type: PropType.oneOf(['Primary', 'Info', 'Error', 'Warning']).isRequired,
    onPress: PropType.func.isRequired,
    buttonStyle: PropType.shape({
        backgrondColor: PropType.string,
        height: PropType.number,
        width: PropType.number,
        borderRadius: PropType.number
    }),
    isDisabled: PropType.bool
}
CustomButton.defaultProp = {
    title: "lable",
    type: "Primary",
    onPress: ()=>{},
    buttonStyle: {},
    isDisabled: false
}

const getStyle = (colors:any) => StyleSheet.create({
    container:{
        height: 45,
        width: '100%',
        paddingHorizontal:10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Primary
    },
    button:{ 
        height:'100%',
        width: deviceWidth()-20,
        backgroundColor:colors.Button.Primary,
        borderRadius: 22,
        justifyContent:'center',
        alignItems:'center',
        borderColor: colors.Border,
        borderWidth:1
    },
    text:{
        color: colors.TextWhite,
        fontSize: fontSize.H3,
        fontWeight: "bold"
    },
    disabled:{
        opacity:.5
    }
})

export default CustomButton;
