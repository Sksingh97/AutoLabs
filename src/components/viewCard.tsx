import React, { useContext } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../provider/theme';
import fontSize from '../constants/fontSize';
import { Checked, CircleChecked, FloorIcon } from '../constants/images';


const ViewCard = ({renderIcon=()=>{}, title, isCheck, onPress, disabled=false}:any) =>{
    const { width, height } = Dimensions.get('window');
    const { colors } = useContext(ThemeContext)
    const styles = getStyle(colors)
    return (
        <TouchableOpacity disabled={disabled} style={styles.mainContainer} onPress={onPress}>
            <View style={styles.imageContianer}>  
                {renderIcon()}
            </View>
            <View style={styles.labelContainer}>
                <Text>{title}</Text>
            </View>
            {isCheck && (
                <View style={styles.checkedImageContainer}>
                    <CircleChecked  width={25} height={25} fill={colors.Text} stroke={colors.TextWhite} />
                </View>)}
        </TouchableOpacity>
    )
}

export default ViewCard


const getStyle = (colors:any) => StyleSheet.create({
    mainContainer:{
        backgroundColor: '#f2f2f2',
        margin: 5,
        width:180,
        maxWidth:180,
        height:106,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContianer: {
        height:'70%',
        width: '100%',
        justifyContent:'center',
        alignItems:'center',
    },
    labelContainer:{
        height:'30%',
        width: '100%',
        alignItems:'center',
    },
    checkedImageContainer:{
        position:'absolute',
        top:10,
        right:10
    }
})