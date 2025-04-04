import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ThemeContext } from '../provider/theme';
import { Appliance } from '../constants/images';
import LogoBaner from './logoBaner';
import { vs } from 'react-native-size-matters/extend';

const CircularProgressBar = ({ radius = 50, strokeWidth = 5, percentage = 0 }) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const { colors } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        {/* Background Circle */}
        <Circle
          stroke={colors.Border}
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
        />
        {/* Foreground Circle */}
        <Circle
          stroke={colors.Button.Primary}
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`} // Rotate the circle
        />
      </Svg>
      <View style={styles.imageContainer}>
       <Appliance width={350} height={350}/>
      </View>
      <View style={styles.logo}>
        <LogoBaner logoDim={{height:40,width:40}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer:{
    position:'absolute',
    top:0,
  },
  logo:{
    position:'absolute',
    top:vs(160)
  }
});

export default CircularProgressBar;
