import { StyleSheet, Text, View } from "react-native"

const CreateRoom = () => {
    return (
        <View style={styles.containr}>
            <Text>Create Room</Text>
        </View>
    )
}

export default CreateRoom;

const styles = StyleSheet.create({
    containr:{
        flex:1,
        justifyContent:'center',
        alignConten: 'center'
    }
})