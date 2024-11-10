import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    Platform,
} from "react-native"

import { useContext } from "react"
import { ThemeContext } from "../provider/theme"

import { isIos } from "../utils/helper"
import fontSize from "../constants/fontSize"
import PropTypes from 'prop-types';

const Header = ({LeftIcons, Title="", RightIcons}:any) => {
    const {colors} = useContext(ThemeContext)
    const styles = getStyle(colors)
    return (
        <View style={styles.container}>
            {/* Header left button */}
            <View style={styles.LeftIconContainer}>
                {LeftIcons && LeftIcons.map((item:any, i:number)=>(<TouchableOpacity key={`Left-icon${i}`} style={styles.LeftIconButton}>
                    {item()}
                    {/* <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text}/> */}
                </TouchableOpacity>))}
            </View>
            {/* Header title */}
            <View style={styles.CenterTitleContainer}>
                <Text style={styles.TitleText}>{Title}</Text>
            </View>
            {/* Header right button */}
            <View style={styles.RightIconContainer}>
            {RightIcons && RightIcons.map((item:any, i:number)=>(<TouchableOpacity key={`Left-icon${i}`} style={styles.RightIconButton}>
                    {item()}
                    {/* <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text}/> */}
                </TouchableOpacity>))}
            </View>
        </View>
    )
}

Header.propTypes = {
    LeftIcons: PropTypes.arrayOf(PropTypes.func).isRequired,
    Title: PropTypes.string.isRequired,
    RightIcons: PropTypes.arrayOf(PropTypes.func).isRequired
  };
  
// Define default props (optional)
Header.defaultProps = {
    LeftIcons: [],
    Title: "",
    RightIcons: []
};

export default Header

const getStyle = (colors:any) => StyleSheet.create({
    container: {
        height:50,
        width: '100%',
        backgroundColor: colors.Primary,
        marginTop: isIos()?25:0,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    LeftIconContainer:{
        width: "25%",
        paddingLeft: 20,
        flexDirection: 'row'
    },
    RightIconContainer:{
        width: "25%",
        paddingLeft: 24,
        flexDirection: 'row-reverse'
    },
    CenterTitleContainer:{
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    TitleText:{
        color: colors.Text,
        fontSize: fontSize.H2
    },
    LeftIconButton:{
        height:50,
        justifyContent: 'center',
        alignContent: 'center',
    },
    RightIconButton:{
        height:50,
        justifyContent: 'center',
        alignContent: 'center',
        
    },
})