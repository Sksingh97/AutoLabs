import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useContext, useEffect, useState } from "react";
import { ThemeContext, ThemeProvider } from "../../../provider/theme";
import { HomeIcon, LeftArrow, Plus, RightArrow } from "../../../constants/images";
import SetupHeading from "../../../components/setupHeading";
import SetupHeader from "../../../components/setupHeader";
import InputField from "../../../components/inputField";
import Vrs from "../../../components/verticalSpacer";
import CustomButton from "../../../components/button";
import { useDispatch, useSelector } from "react-redux"
import { createHomeRequest, getHomeRequest } from "../../../store/actions/homeActions";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { deviceWidth, getColumns } from "../../../utils/helper";
import Home from "../../Main/Home";
import ViewCard from "../../../components/viewCard";

const CreateHome = ({route, navigation}:any) => {
    const {colors, translations} = useContext(ThemeContext)
    const { noOfSteps, currentStep} = route.params;
    const [name, setHomeName] = useState("");
    const [nameError, setHomeNameError] = useState("");
    const [address, setHomeAddress] = useState("");
    const [addressError, setHomeAddressError] = useState("");
    const styles = getStyles(colors);
    const dispatch = useDispatch();
    const {data} = useSelector((state:any) => state.home);
    const [createHomeFlag, setCreateHomeFlag] = useState(false)

    useEffect(() => {
        dispatch(getHomeRequest())
    }, []);
    const renderBack =() =>{
        return (
            <TouchableOpacity onPress={()=>{setCreateHomeFlag(false)}}>
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
                        {translations.setupScreen.home.home}
                    </Text>
            </View>
        )
    }

    const renderSelectHomeName = () => {
        return (
            <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>
                        {translations.setupScreen.home.select}
                    </Text>
                    <Text style={styles.headingHylightedText}>
                        {translations.setupScreen.home.home}
                    </Text>
            </View>
        )
    }
    const renderStepCount =()=><Text> {currentStep} / {noOfSteps} </Text>
    const createHome = () => {
        //validate input and call dispatcher
        var hasError=false
        if(name==""|| name.length<3){
            setHomeNameError("Name is required len > 3")
            hasError = true
        }
        if(address==""|| address.length<3){
            setHomeAddressError("Address is required len > 3")
            hasError = true
        }
        if(hasError){
            return
        }
        dispatch(createHomeRequest({data:{name: name, address: address}, noOfSteps, currentStep}))
    }

    const goToNextScreen = (id) => {
        navigation.push('CreateFloor', {noOfSteps:noOfSteps, currentStep:1+currentStep, parentId: id})
    }

    const renderViewCardIcon = (item)=> {
        if(item.id == '-STATIC-'){
            return <Plus  width={35} height={35} fill={colors.Button.Primary} stroke={colors.Button.Primary}/>
        } else {
            return <HomeIcon  width={35} height={35} fill={colors.Button.Primary} stroke={colors.Button.Primary}/>
        }
    }

    const renderItem = ({ item }:any) => {
        return (
          <ViewCard 
          key={`Home-List-${item.id}`} 
          renderIcon={()=>renderViewCardIcon(item)} 
          title={item.name} 
          isCheck={false} 
          onPress={item.id == '-STATIC-'?()=>{setCreateHomeFlag(true)}:()=>{
            goToNextScreen(item.id)
          }}/>
        )
      }
    
    const renderHomeList = () => {
        const numColumns = getColumns();

        return (
            <>
            <Vrs height={20}/>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>
                        Current Homes
                    </Text>
                </View>
                <FlatList
                data={[{name: "Add Home", id:"-STATIC-"}, ...data]}
                numColumns={numColumns}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.homeFlatListContainer}
                />
            </>
        )
    }

    const renderHomeCreateForm=()=>{
        return (
            <>
            
            
            <InputField label={translations.setupScreen.home.name} placeHolder={`${translations.setupScreen.home.home} ${translations.setupScreen.home.name}`} onChange={(value:string)=>{setHomeNameError("");setHomeName(value.trim())}} hasError={nameError.length>0} error={nameError}/>
            <Vrs height={20}/>
            <InputField label={translations.setupScreen.home.fullAddress} placeHolder={translations.setupScreen.home.fullAddress}  onChange={(value:string)=>{ setHomeAddressError("");setHomeAddress(value.trim())}} hasError={addressError.length>0} error={addressError}/>
            <Vrs height={40}/>
            {/* <View style={styles.buttonContainer}>
                <CustomButton title={translations.setupScreen.back} isDisabled={currentStep==1}  buttonStyle={styles.button} onPress={()=>{navigation.pop()}}/>
                <CustomButton title={translations.setupScreen.save} buttonStyle={styles.button} onPress={createHome}/>
            </View> */}
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
            <SetupHeading message={(data && data.length>0 && !createHomeFlag)?renderSelectHomeName:renderAddHomeName} subMessage={(data && data.length>0 && !createHomeFlag)?translations.setupScreen.home.subHeadingSelect:translations.setupScreen.home.subHeading}/>
            <Vrs height={20}/>
            {(data && data.length>0 && !createHomeFlag)?renderHomeList():renderHomeCreateForm()}
            
        </View>
    )
}

export default CreateHome;

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
    lableContainer:{
        height:50,
        width:deviceWidth()-deviceWidth()*.1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:20
    },
    lable:{
        fontSize:20,
        opacity:.8,
        color: colors.Text
    },
    homeListContainer:{
        width:'100%',
        height: '85%',
        paddingHorizontal:20,
    },
    homeListItem:{
        width:'100%',
        height: 50,
        backgroundColor: colors.Button.Primary,
        borderRadius:5,
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent:'space-between'
    },
    homeListItemDetailsContainer:{
        width:'70%',
    },
    homeListItemButton:{
        height: 50,
        width:50,
        justifyContent: 'center',
        alignItems:'center',
    },
    homeNameContainer:{
        height:50,
        paddingLeft:10,
        justifyContent:'center'
    },
    homeName: {
        fontSize: 15,
        color: colors.TextWhite
    },
    listItemImageContainer:{
        height: 50,
        width:50,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:5,
        paddingTop:10,
    },
    homeFlatListContainer: {
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