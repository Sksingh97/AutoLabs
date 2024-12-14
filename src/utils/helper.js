import { Platform, Dimensions } from "react-native";
import Toast from 'react-native-toast-message';
import { PixelRatio } from 'react-native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-dimensions';
const scale = PixelRatio.get(); // Device pixel ratio

const { width } = Dimensions.get('window');
// export {
//     hp,
//     wp
// }
export const scaleFont = (size) => size * PixelRatio.getFontScale();
export const scaleSize = (size) => size * scale;
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

export const getColumns = () => {
    if (width > 1200) return 4; // 4 columns for large screens (e.g., tablets)
    if (width > 800) return 3;  // 3 columns for medium screens (e.g., larger phones)
    return 2; // 2 columns for small screens (e.g., small phones)
  };