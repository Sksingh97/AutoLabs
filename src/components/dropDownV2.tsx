import React, { useContext, useEffect, useState } from 'react';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../provider/theme';
import { Down, Up } from '../constants/images';
import { s, vs } from 'react-native-size-matters/extend';
import { DropdownItem } from '../interfaces/interfaces';

interface DropDownSelectProps {
    placeHolder?: string; // Optional placeholder
    values: DropdownItem[]; // Required values array
    onValueChange?: (value: any | null) => void; // Optional callback for value change
    isLoading?: boolean;
    label: string;
}

const DropDownSelect: React.FC<DropDownSelectProps> = ({ placeHolder = "", values, onValueChange, isLoading, label }) => {
    const { colors, translations } = useContext(ThemeContext);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(values);
    const styles = getStyles(colors);
    useEffect(()=>{
        setItems(values)
    },[values]);

    useEffect(()=>{
        setValue(null)
    },[isLoading]);
    return (
        <View style={styles.container}>
            <View style={styles.lableContainer}>
                <Text style={styles.text}>{label}</Text>
            </View>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onSelectItem={onValueChange}
                disabled={isLoading || values.length == 0}
                placeholder={placeHolder}
                style={{ marginTop:8, backgroundColor: colors.Secondary, borderWidth:0 , paddingHorizontal: 25, height:vs(65), }}
                dropDownContainerStyle={{ backgroundColor: colors.Border, zIndex:9999, paddingVertical:20 }} 
                labelStyle={{
                    color: colors.Text,
                }}
                placeholderStyle={{
                    color: colors.Text,
                }}
                selectedItemLabelStyle={{
                    color: colors.TextWhite,
                }}
                selectedItemContainerStyle={{
                    backgroundColor: colors.Button.Primary
                }}
                listItemLabelStyle={{
                    color: colors.Text,
                    paddingHorizontal: 20,
                }}
                TickIconComponent={()=><></>}
                ArrowDownIconComponent={()=>isLoading?<ActivityIndicator size='small' color={colors.Text} />:<Down width={s(12)} height={s(12)} fill={colors.Text} stroke={colors.Text} />}
                ArrowUpIconComponent={()=><Up width={s(12)} height={s(12)} fill={colors.Text} stroke={colors.Text} />}
            />
        </View>
    );
};

const getStyles = (colors) => StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: vs(120),
    },
    lableContainer:{
        height: vs(29),
        width:'100%',
        justifyContent: 'center',
    },
    text:{
        color: colors.Text
    }
});

export default DropDownSelect;