import {View, StyleSheet} from "react-native"
import ProtoType from 'prop-types'

const Vrs = ({height=0}:any) => {
    return (
        <View style={[styles.container, {height}]}/>
    )
}

Vrs.protoType = {
    height: ProtoType.number
}

export default Vrs;

const styles = StyleSheet.create({
    container:{
        width:'100%'
    }
})