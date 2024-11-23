import React, { useContext, useRef } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { ThemeContext } from '../provider/theme';
import Vrs from './verticalSpacer';
import PropType from "prop-types"

const OtpInput = ({ length=4, onChange=()=>{}, label="" }:any) => {
    const {colors} = useContext(ThemeContext)
    const styles = getStyles(colors)
  const inputRefs = useRef([]);

  const handleChangeText = (text:string, index:number) => {
    if (text.length > 1) {
      text = text.charAt(text.length - 1); // only take the last character if more than one is entered
    }
    

    onChange && onChange(text, index);

    if (text.length > 0 && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e:any, index:number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.lableContainer}>
            <Text style={styles.lable}>{label}</Text>
        </View>
        <Vrs height={10}/>
        <View style={styles.otpContainer}>
            {Array(length).fill(null).map((_, index) => (
                <TextInput
                key={index}
                ref={ref => inputRefs.current[index] = ref}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={text => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                textAlign="center"
                returnKeyType="next"
                />
            ))}
        </View>
    </View>
    
  );
};

const getStyles=(colors:any) => StyleSheet.create({
    container: {
        padding:20
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: colors.Border,
        backgroundColor: colors.Secondary,
        fontSize: 18,
        marginHorizontal: 5,
        borderRadius:5
    },
    lableContainer:{
        height: 29,
        width:'100%',
        justifyContent: 'center',
    },
    lable:{
        color: colors.Text
    }
});

OtpInput.prototype = {
    lable: PropType.string.isRequired,
    length: PropType.number,
    onChange: PropType.func.isRequired
}


export default OtpInput;