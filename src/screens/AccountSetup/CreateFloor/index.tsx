import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Header from "../../../components/header";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, ThemeProvider } from "../../../provider/theme";
import { FloorIcon, LeftArrow } from "../../../constants/images";
import Heading from "../../../components/heading";
import SetupHeading from "../../../components/setupHeading";
import SetupHeader from "../../../components/setupHeader";
import InputField from "../../../components/inputField";
import Vrs from "../../../components/verticalSpacer";
import CustomButton from "../../../components/button";
import { deviceHeight, deviceWidth, getColumns } from "../../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { createFloorRequest, getFloorRequest, resetFloors } from "../../../store/actions/floorAction";
import ViewCard from "../../../components/viewCard";

const CreateFloor = ({route, navigation}:any) => {
    const {colors, translations} = useContext(ThemeContext)
    const { noOfSteps, currentStep, parentId} = route.params;
    const [floorName, setFloorName] = useState("");
    const [floorNameError, setFloorNameError] = useState("");
    const {data} = useSelector((state:any) => state.floor);
    const styles = getStyles(colors);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFloorRequest({id:parentId}))
    }, []);

    const renderBack =() =>{
        return (
            <TouchableOpacity onPress={()=>{dispatch(resetFloors());navigation.pop();}}>
                <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text} />
            </TouchableOpacity>
        )
    }

    const renderAddHomeName = () => {
        return (
            <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>
                        {translations.setupScreen.floor.create}
                    </Text>
                    <Text style={styles.headingHylightedText}>
                        {translations.setupScreen.floor.floors}
                    </Text>
                    <Text style={styles.headingText}>
                        {translations.setupScreen.floor.name}
                    </Text>
            </View>
        )
    }

    const createFloorReq = () => {
        if (floorName.length>0){
            dispatch(createFloorRequest({data:{name:floorName, home_id: parentId}, noOfSteps, currentStep}))
        } else{
            setFloorNameError(translations.setupScreen.floor.nameError)
        }
    }
    const renderStepCount =()=><Text> {currentStep} / {noOfSteps} </Text>

    const goToNextScreen = (id) => {
        navigation.push('CreateRoom', {noOfSteps:noOfSteps, currentStep:1+currentStep, parentId: id})
    }

    const renderItem = ({item}) => {
        return (
            <>
                <ViewCard 
                renderIcon={()=>(<FloorIcon  width={40} height={40} fill={colors.Button.Primary} stroke={colors.Button.Primary}/>)} 
                key={`list-floor-${item.id}`} 
                title={item.name} 
                isCheck={item.is_active} 
                onPress={()=>{
                    goToNextScreen(item.id)
                    }}/>
                </>
        )
    }



    const renderFloors = () => {
        const numColumns = getColumns();

        return (
            <>
            <Vrs height={20}/>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>
                        Current Floors
                    </Text>
                </View>
                <FlatList
                data={data}
                numColumns={numColumns}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.floorListContainer}
                />
            </>
        )
    }
    
    return (
        <View style={styles.containr}>
            <SetupHeader
            LeftIcons={[renderBack]}
            RightIcons={[renderStepCount]}
            noOfStep={noOfSteps}
            currentStep={currentStep}
            />
            <SetupHeading message={renderAddHomeName} subMessage={translations.setupScreen.floor.subHeading}/>
            <Vrs height={20}/>
                <InputField 
                showRightIcon 
                rightIconType="Add" 
                placeHolder={`${translations.setupScreen.floor.floor} ${translations.setupScreen.floor.name}`}
                hasError={floorNameError.length>0} 
                error={floorNameError} 
                onChange={(value:string)=>{setFloorNameError("");setFloorName(value.trim()); console.log(floorName)}} 
                iconPressHandler={createFloorReq}/>
            {(data&&data.length>0)?renderFloors():<></>}
            {/* <View style={styles.buttonContainer}>
                <CustomButton title={translations.setupScreen.back} isDisabled={currentStep==1} buttonStyle={styles.button} onPress={()=>{navigation.pop()}}/>
                <CustomButton title={translations.setupScreen.save} buttonStyle={styles.button} onPress={()=>{navigation.push('CreateRoom', {noOfSteps, currentStep:1+currentStep})}}/>
            </View> */}
        </View>
    )
}

export default CreateFloor;

const getStyles = (colors:any) => StyleSheet.create({
    containr:{
        backgroundColor: colors.Primary,
        flex:1
    },
    headingContainer:{
        flexDirection:'row',
        justifyContent:'center',
        width:'100%',
    },
    headingText: {
        fontSize: 24,
        color: colors.Text,
        fontWeight: "bold",
    },
    headingHylightedText: {
        fontSize: 24,
        color: colors.Button.Primary,
        fontWeight: "bold",
        marginLeft: 8,
        marginRight:8
    },
    buttonContainer:{
        width:'100%',
        flexDirection:'row', 
        justifyContent:'space-between', 
        paddingHorizontal:20,
        position: 'absolute',
        bottom:20
    },
    button:{
        width:150
    },
    inputButtonContainer:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',
    },
    floorListContainer: {
        width:'100%',
        paddingHorizontal: 10
    },
    labelContainer:{
        width: deviceWidth()-20,
        height: 50,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems: 'center',
    },
    label: {
        color: colors.Text,
        fontWeight: 'bold',
        fontSize: 20
    }
})