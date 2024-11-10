import {View, StyleSheet} from "react-native"
import ProtoType from 'prop-types'

const Vrs = ({height}:any) => {
    return (
        <View style={[styles.container, {height}]}/>
    )
}

Vrs.protoType = {
    height: ProtoType.number
}

Vrs.defaultProps = {
    height:0
}

export default Vrs;

const styles = StyleSheet.create({
    container:{
        width:'100%'
    }
})