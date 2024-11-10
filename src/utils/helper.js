import { Platform, Dimensions } from "react-native";
import Toast from 'react-native-toast-message';

export const isIos = () => {
    return Platform.OS != "android"
}

export const deviceWidth = () => {
    return Dimensions.get('screen').width
}

export const deviceHeight = () => {
    return Dimensions.get('screen').height
}

export const validateIndianPhoneNumber = (number) => {
    const regex = /^\d{10}$/;
    return regex.test(number);
}

export const showTost = ({type="success", header="", message=""}) => {
    Toast.show({
        type: type,
        text1: header,
        text2: message,
        position: "top",
        text1Style: {fontSize:16, color: "#000", fontWeight: "normal"},
        text2Style: { fontSize: 14, color: "#000", fontWeight: "normal"},
        bottomOffset: 0,
        visibilityTime: 2000
      });
}