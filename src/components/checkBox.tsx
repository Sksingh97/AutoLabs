import { useCallback, useContext, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { Checked, UnChecked } from "../constants/images"
import { ThemeContext } from "../provider/theme"

const CustomCheckBox = ({onChange, isChecked}:any) => {
    const [checked, setChecked] = useState(isChecked)
    const {colors} = useContext(ThemeContext)
    return(
        <View>
            <TouchableOpacity onPress={()=>{setChecked(!checked); onChange(!checked)}}>
                {
                    checked?
                    <Checked width={20} height={20} fill={colors.Primary} stroke={colors.Text}/>
                    :
                    <UnChecked width={20} height={20} fill={colors.Primary} stroke={colors.Text}/>
                }
            </TouchableOpacity>
        </View>
    )
}

export default CustomCheckBox