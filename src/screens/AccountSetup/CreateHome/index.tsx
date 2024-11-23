import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useContext, useEffect, useState } from "react";
import { ThemeContext, ThemeProvider } from "../../../provider/theme";
import { HomeIcon, LeftArrow, RightArrow } from "../../../constants/images";
import SetupHeading from "../../../components/setupHeading";
import SetupHeader from "../../../components/setupHeader";
import InputField from "../../../components/inputField";
import Vrs from "../../../components/verticalSpacer";
import CustomButton from "../../../components/button";
import { useDispatch, useSelector } from "react-redux"
import { createHomeRequest, getHomeRequest } from "../../../store/actions/homeActions";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { deviceWidth } from "../../../utils/helper";
import Home from "../../Main/Home";

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

    const renderItem = ({ item }:any) => {
        return (
          <TouchableOpacity style={styles.homeListItem} onPress={
            ()=>{
                goToNextScreen(item.id)
            }
          }>
            <View style={styles.listItemImageContainer}>
            <HomeIcon width={100} height={100} fill={colors.TextWhite} stroke={colors.TextWhite} />
            </View>
            <View style={styles.homeListItemDetailsContainer}>
                <View style={styles.homeNameContainer}>
                    <Text style={styles.homeName}>{item.name} - {item.address}</Text>
                </View>
            </View>
            <View style={styles.homeListItemButton}>
                <RightArrow width={25} height={25} fill={colors.Primary} stroke={colors.Primary} />
            </View>
          </TouchableOpacity>
        );
      };
    
    const renderHomeList = () => {
        return (
            <>

                <FlatList
                    contentContainerStyle={styles.homeListContainer}
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
                <View style={styles.buttonContainer}>
                    <CustomButton title={translations.setupScreen.back} isDisabled={currentStep==1}  buttonStyle={styles.button} onPress={()=>{navigation.pop()}}/>
                    <CustomButton title={translations.setupScreen.create} buttonStyle={styles.button} onPress={()=>{setCreateHomeFlag(!createHomeFlag)}}/>
                </View>
            </>
        )
    }

    const renderHomeCreateForm=()=>{
        return (
            <>
            
            
            <InputField label={translations.setupScreen.home.name} placeHolder={`${translations.setupScreen.home.home} ${translations.setupScreen.home.name}`} onChange={(value:string)=>{setHomeNameError("");setHomeName(value)}} hasError={nameError.length>0} error={nameError}/>
            <Vrs height={20}/>
            <InputField label={translations.setupScreen.home.fullAddress} placeHolder={translations.setupScreen.home.fullAddress}  onChange={(value:string)=>{ setHomeAddressError("");setHomeAddress(value)}} hasError={addressError.length>0} error={addressError}/>
            <Vrs height={40}/>
            <View style={styles.buttonContainer}>
                <CustomButton title={translations.setupScreen.back} isDisabled={currentStep==1}  buttonStyle={styles.button} onPress={()=>{navigation.pop()}}/>
                <CustomButton title={translations.setupScreen.save} buttonStyle={styles.button} onPress={createHome}/>
            </View>
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
    }

})