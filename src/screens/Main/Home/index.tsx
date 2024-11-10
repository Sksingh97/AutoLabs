import { StyleSheet, Text, View } from "react-native"

const Home = () => {
    return (
        <View style={styles.containr}>
            <Text>Home Screen</Text>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    containr:{
        flex:1,
        justifyContent:'center',
        alignConten: 'center'
    }
})