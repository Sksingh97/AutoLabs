import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Header from "../../../components/header";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, ThemeProvider } from "../../../provider/theme";
import { Balcony, Bathroom, Bedroom, Diningroom, FloorIcon, Kitchen, LeftArrow, Livingroom, Studyroom } from "../../../constants/images";
import Heading from "../../../components/heading";
import SetupHeading from "../../../components/setupHeading";
import SetupHeader from "../../../components/setupHeader";
import InputField from "../../../components/inputField";
import Vrs from "../../../components/verticalSpacer";
import CustomButton from "../../../components/button";
import { deviceHeight, deviceWidth, getColumns } from "../../../utils/helper";
import { createRoomRequest, getRoomRequest } from "../../../store/actions/roomAction";
import { useDispatch, useSelector } from "react-redux";
import ViewCard from "../../../components/viewCard";

const CreateRoom = ({route, navigation}:any) => {
    const {colors, translations} = useContext(ThemeContext)
    const { noOfSteps, currentStep, parentId} = route.params;
    const [ roomName, setRoomName ] = useState("")
    const [roomNameError, setRoomNameError] = useState("");
    const {data} = useSelector((state:any) => state.room);
    const styles = getStyles(colors);
    const dispatch = useDispatch();
    console.log("Got floor id : : :",parentId, data)
    useEffect(() => {
        dispatch(getRoomRequest({id:parentId}))
    }, []);
    const renderBack =() =>{
        return (
            <TouchableOpacity onPress={()=>{navigation.pop();}}>
                <LeftArrow width={25} height={25} fill={colors.Text} stroke={colors.Text} />
            </TouchableOpacity>
        )
    }

    const renderAddHomeName = () => {
        return (
            <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>
                        {translations.setupScreen.home.add}
                    </Text>
                    <Text style={styles.headingHylightedText}>
                        {translations.setupScreen.room.room}
                    </Text>
                    <Text style={styles.headingText}>
                        {translations.setupScreen.home.name}
                    </Text>
            </View>
        )
    }

    const createRoomReq = () => {
        if (roomName.length>0){
            dispatch(createRoomRequest({data:{name:roomName, floor_id: parentId}, noOfSteps, currentStep}))
        } else{
            setRoomNameError(translations.setupScreen.room.nameError)
        }
    }

    const renderStepCount =()=><Text> {currentStep} / {noOfSteps} </Text>

    const goToNextScreen = (id) => {
        navigation.push('Home', {noOfSteps:noOfSteps, currentStep:1+currentStep, parentId: id})
    }

    const getIconByRoomName=(name:string)=>{
        const bedPattern = /bed/i;
        const bathPattern = /bath/i;
        const foodPattern = /food/i;
        const kitchenPattern = /kitchen/i;
        const diningPattern = /dining/i;
        const balconyPattern = /balcony/i;
        const livingPattern = /living/i;
        const studyPattern = /study/i;
        console.log("Name: ", name, bedPattern.test(name))
        if (bedPattern.test(name)) {
            return <Bedroom width={40} height={40} fill={colors.Button.Primary} stroke={colors.Button.Primary} />;
        } else if (bathPattern.test(name)) {
            return <Bathroom width={40} height={40} fill={colors.Button.Primary} stroke={colors.Button.Primary} />;
        } else if (foodPattern.test(name)) {
            return <Diningroom width={40} height={40} fill={colors.Button.Primary} stroke={colors.Button.Primary} />;
        } else if (kitchenPattern.test(name)) {
            return <Kitchen width={40} height={40} fill={colors.Button.Primary} stroke={colors.Button.Primary} />;
        } else if (diningPattern.test(name)) {
            return <Diningroom width={40} height={40} fill={colors.Button.Primary} stroke={colors.Button.Primary} />;
        } else if (balconyPattern.test(name)) {
            return <Balcony width={40} height={40} fill={colors.Button.Primary} stroke={colors.Button.Primary} />;
        } else if (livingPattern.test(name)) {
            return <Livingroom width={40} height={40} fill={colors.Button.Primary} stroke={colors.Button.Primary} />;
        } else if (studyPattern.test(name)) {
            return <Studyroom width={40} height={40} fill={colors.Button.Primary} stroke={colors.Button.Primary} />;
        } else {
            return <FloorIcon width={40} height={40} fill={colors.Button.Primary} stroke={colors.Button.Primary} />;
        }
    }

    const renderItem = ({item}) => {
        return (
            <>
                <ViewCard 
                renderIcon={()=>(getIconByRoomName(item.name))} 
                key={`list-floor-${item.id}`} 
                title={item.name} 
                disabled={true}
                isCheck={item.is_active} 
                onPress={()=>{
                    goToNextScreen(item.id)
                    }}/>
                </>
        )
    }



    const renderRoomss = () => {
        const numColumns = getColumns();

        return (
            <>
            <Vrs height={20}/>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>
                        Current Rooms
                    </Text>
                </View>
                <FlatList
                data={data}
                numColumns={numColumns}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.roomListContainer}
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
            <SetupHeading message={renderAddHomeName} subMessage={translations.setupScreen.room.subHeading}/>
            <Vrs height={20}/>
            <InputField 
                showRightIcon 
                rightIconType="Add"
                placeHolder={`${translations.setupScreen.room.room} ${translations.setupScreen.room.name}`}
                hasError={roomNameError.length>0}
                error={roomNameError}
                onChange={(value:string)=>{setRoomNameError("");setRoomName(value.trim()); console.log(roomName)}} 
                iconPressHandler={createRoomReq}
                />
                {(data&&data.length>0)?renderRoomss():<></>}
            <View style={styles.buttonContainer}>
                {/* <CustomButton title={translations.setupScreen.back} isDisabled={currentStep==1}  buttonStyle={styles.button} onPress={()=>{navigation.pop()}}/> */}
                <CustomButton title={translations.setupScreen.room.done} buttonStyle={styles.button} onPress={()=>{navigation.push('WellDone', {noOfSteps, currentStep:1+currentStep})}}/>
            </View>
            
        </View>
    )
}

export default CreateRoom;

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
        width:deviceWidth()-40,
    },
    roomListContainer: {
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