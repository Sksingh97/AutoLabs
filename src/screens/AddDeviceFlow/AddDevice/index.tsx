import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../../../components/header"
import { useContext } from "react"
import { ThemeContext, ThemeProvider } from "../../../provider/theme"
import { StyleSheet } from "react-native"



const AddDevice = ({}) => {
    const {colors, translations} = useContext(ThemeContext);
    const styles = getSyles(colors)
    return (
        <SafeAreaView style={styles.container}>
            <Header Title={"Add Device"}/>
        </SafeAreaView>
    )
}

export default AddDevice;

const getSyles = (colors) => StyleSheet.create({
    container: {
        backgroundColor: colors.Primary,
        flex:1
    }
})