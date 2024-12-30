import React, { useContext, useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../provider/theme';
import { Down, Up } from '../constants/images';
import { s } from 'react-native-size-matters/extend';
import { DropdownItem } from '../interfaces/interfaces';

interface DropDownSelectProps {
    placeHolder?: string; // Optional placeholder
    values: DropdownItem[]; // Required values array
    onValueChange?: (value: string | null) => void; // Optional callback for value change
}

const DropDownSelect: React.FC<DropDownSelectProps> = ({ placeHolder = "", values, onValueChange }) => {
    const { colors, translations } = useContext(ThemeContext);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(values);
    useEffect(()=>{
        setItems(values)
    },[values])
    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={placeHolder}
                style={{ backgroundColor: colors.Primary, borderWidth:2, borderColor:colors.Border }}
                dropDownContainerStyle={{ backgroundColor: colors.Primary }} 
                labelStyle={{
                    color: colors.Text,
                }}
                placeholderStyle={{
                    color: colors.Text,
                }}
                selectedItemLabelStyle={{
                    color: colors.TextWhite 
                }}
                selectedItemContainerStyle={{
                    backgroundColor: colors.Button.Primary
                }}
                listItemLabelStyle={{
                    color: colors.Text
                }}
                TickIconComponent={()=><></>}
                ArrowDownIconComponent={()=><Down width={s(12)} height={s(12)} fill={colors.Text} stroke={colors.Text} />}
                ArrowUpIconComponent={()=><Up width={s(12)} height={s(12)} fill={colors.Text} stroke={colors.Text} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 20,
        justifyContent: 'center',
        paddingTop: 40,
    },
});

export default DropDownSelect;