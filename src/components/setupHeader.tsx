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

import { deviceWidth, isIos } from "../utils/helper"
import fontSize from "../constants/fontSize"
import PropTypes from 'prop-types';
import { current } from "@reduxjs/toolkit"

const SetupHeader = ({LeftIcons=[], Title="", RightIcons=[], noOfStep=0, currentStep=0}:any) => {
    const {colors} = useContext(ThemeContext)
    const styles = getStyle(colors)
    const getProgressWidth=()=>{
        return noOfStep*((deviceWidth()/2)/noOfStep)
    }
    const getFillerWidth=()=>{
        return currentStep*((deviceWidth()/2)/noOfStep)
    }
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
                <View style={[styles.progressBar, {width:getProgressWidth()}]}>
                    <View  style={[styles.progressFiller, {width:getFillerWidth()}]}></View>
                </View>
            </View>
            {/* Header right button */}
            <View style={styles.RightIconContainer}>
            {RightIcons && RightIcons.map((item:any, i:number)=>(<TouchableOpacity key={`Right-icon${i}`} style={styles.RightIconButton}>
                    {item()}
                    {/* <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text}/> */}
                </TouchableOpacity>))}
                
            </View>
        </View>
    )
}

SetupHeader.propTypes = {
    LeftIcons: PropTypes.arrayOf(PropTypes.func).isRequired,
    RightIcons: PropTypes.arrayOf(PropTypes.func),
    noOfStep: PropTypes.number,
    currentStep: PropTypes.number
  };

export default SetupHeader

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
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    RightIconContainer:{
        width: "25%",
        // paddingLeft: 24,
        flexDirection: 'row-reverse',
        justifyContent:'center',
        alignItems:'center',
    },
    CenterTitleContainer:{
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
    progressBar:{
        height:10,
        width:'100%',
        backgroundColor: colors.Border,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    progressFiller:{
        height:10,
        width:'20%',
        borderRadius:5,
        alignItems: 'center',
        backgroundColor: colors.Button.Primary
    }
})