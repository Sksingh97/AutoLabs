import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useContext} from 'react'
import PropType from 'prop-types'
import { ThemeContext } from '../provider/theme';
import { deviceWidth } from '../utils/helper';
import fontSize from '../constants/fontSize';
import { Add, Plus } from '../constants/images';
import { mvs } from 'react-native-size-matters';

const CustomButton = ({showIcon = false, title="lable", type="Primary", onPress=()=>{}, buttonStyle={}, isDisabled=false}:any) => {
    const {colors} = useContext(ThemeContext)
    const styles = getStyle(colors)
    return (
        <View style={[styles.container, buttonStyle, isDisabled?styles.disabled:{}]}>
            <TouchableOpacity style={[styles.button,buttonStyle, {borderRadius: buttonStyle.height?buttonStyle.height/2:22}]} onPress={onPress} disabled={isDisabled}>
                <View style={[styles.buttonInternalContainer, {width: buttonStyle.width? buttonStyle.width: deviceWidth()}]}>
                    {showIcon&&(<Add width={mvs(20)} height={mvs(20)} fill={colors.TextWhite} stroke={colors.TextWhite} />)}
                    <Text style={styles.text}>{title}</Text>  
                </View>
                                                                                                                     
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
    },
    buttonInternalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})

export default CustomButton;
