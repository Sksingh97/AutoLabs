import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Header from "../../../components/header";
import { useContext } from "react";
import { ThemeContext, ThemeProvider } from "../../../provider/theme";
import { LeftArrow } from "../../../constants/images";

const CreateHome = ({navigation}:any) => {
    const {colors} = useContext(ThemeContext)
    const styles = getStyles(colors);
    const renderBack =() =>{
        return (
            <TouchableOpacity onPress={()=>{navigation.pop();}}>
                <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.containr}>
            <Header
            LeftIcons={[renderBack]}
            />
        </View>
    )
}

export default CreateHome;

const getStyles = (colors:any) => StyleSheet.create({
    containr:{
        backgroundColor: colors.Primary,
        flex:1
    }
})