import { useContext, useState } from "react"
import { Animated, StyleSheet, Text, TouchableOpacity, View, FlatList, TouchableWithoutFeedback } from "react-native"
import { s, vs, mvs } from "react-native-size-matters/extend"
import { ThemeContext } from "../provider/theme"
import { DownUp } from "../constants/images"

const DropDown = () =>{
    const {colors, translations} = useContext(ThemeContext)
    const styles = getStyles(colors);
    const [selectedValue, setSelectedValue] = useState({title:"Select An Option", value:0})
    const [rotation] = useState(new Animated.Value(0)); // Initial value for rotation
    const [opacityAnim] = useState(new Animated.Value(0));
    const [translateY] = useState(new Animated.Value(10));
    const [showList, setShowList] = useState(false);
    const data = [
        {title: "Home 1", value: 1},
        {title: "Home 2", value: 2},
        {title: "Home 3", value: 3},
        {title: "Home 4", value: 4},
        {title: "Home 5", value: 5}
    ]
    const rotateIcon = () => {
      // Animate the rotation to 180 degrees
      Animated.timing(rotation, {
        toValue: rotation.__getValue() === 0 ? 1 : 0, // Toggle between 0 and 1
        duration: 500, // Animation duration in milliseconds
        useNativeDriver: true, // Use native driver for performance
      }).start();
    };
  
    // Interpolating the rotation value from 0 to 180 degrees
    const rotateInterpolation = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'], // From 0 degrees to 180 degrees
    });

   // Initial opacity value (0 = fully transparent)

  const toggleVisibility = () => {
    setShowList(!showList);

    // Fade in or fade out based on the visibility state
    Animated.timing(opacityAnim, {
      toValue: showList ? 0 : 1, // If visible, fade out (0), otherwise fade in (1)
      duration: 500, // Duration of the animation (in ms)
      useNativeDriver: true, // Use the native driver for better performance
    }).start(()=>{});
    Animated.timing(translateY, {
        toValue: showList ? 10 : 0, // Move up (-50) or down (0)
        duration: 500,                  // Animation duration (500ms)
        useNativeDriver: true,          // Use native driver for performance
      }).start();
  };

    const renderItem = ({item}) =>{
        return (<>
            <TouchableOpacity style={styles.itemContainer} onPress={()=>{setSelectedValue(item), showHideDropDown()}}>
                <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
        </>)
    }

    const showHideDropDown=()=>{
        rotateIcon()
        toggleVisibility()
    }
    return (
        <>
            <TouchableWithoutFeedback onPress={showHideDropDown}>
                <View style={styles.container}  >
                    <Text style={styles.titleValue}>
                        {selectedValue.title}
                    </Text>
                    <View style={styles.arrowContainer}>
                        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
                            <DownUp width={16} height={16} fill={colors.Text} stroke={colors.Text} />
                        </Animated.View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <Animated.View
        style={{
        opacity: opacityAnim,
        display: opacityAnim?'flex':'rnone',
          width: s(140),
        //   height: vs(100),
          position: 'absolute',
          top: vs(40),
          left: 10,
          backgroundColor: colors.Primary,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{ translateY:translateY }],
          marginTop: 20,
          borderRadius:10,
          zIndex:1,
        }}
      >
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item)=>item.value}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
      </Animated.View>
                
        
        </>
        
    )
}

export default DropDown

const getStyles = (colors) => StyleSheet.create({
    container:{
        width: s(140),
        height: vs(40),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    arrowContainer:{
        width: s(25),
        height: vs(25),
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize: mvs(18),
        color: colors.Text
    },
    listContainer:{
        width: s(140),
        height: 'auto'
    },
    itemContainer:{
        height: vs(40),
        width: s(140),
        justifyContent:'center',
        borderWidth: .5,
        paddingLeft: 10,
        borderColor: colors.Border,
    },
    text:{
        fontSize: mvs(15),
        color: colors.Text,
    },
    titleValue: {
        fontSize: mvs(15),
        color: colors.Text,
        paddingLeft: vs(10)
    }
})