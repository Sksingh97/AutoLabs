import React, { useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { ThemeContext } from '../provider/theme';

const RadarScanner = ({ width, scannedDevices, onDevicePress }) => {
  const radarRadius = width * 0.4;
  const sweepAngle = useRef(new Animated.Value(0)).current;
  const { colors } = useContext(ThemeContext)

  useEffect(() => {
    Animated.loop(
      Animated.timing(sweepAngle, {
        toValue: 360,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const interpolateSweep = sweepAngle.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const renderScannedDevices = () => {
    if (!scannedDevices || scannedDevices.length === 0) {
      return null;
    }

    return scannedDevices.map((device, index) => {
      const x = radarRadius + radarRadius * device.distance * Math.cos(device.angle * Math.PI / 180);
      const y = radarRadius + radarRadius * device.distance * Math.sin(device.angle * Math.PI / 180);

      return (
        <TouchableOpacity
          key={index}
          onPress={() => onDevicePress(device)}
          style={{ justifyContent: 'center',alignItems: 'center', position: 'absolute', left: x, top: y, transform: [{ translateX: -15 }, { translateY: -15 }]}}
        >
          {device.render()}
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={[styles.container, { width, height: width }]}>
      <Svg width={width} height={width}>
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <Circle
            key={scale}
            cx={radarRadius}
            cy={radarRadius}
            r={radarRadius * scale}
            stroke={colors.Radar}
            opacity={1-scale*.7}
            strokeWidth={1}
            fill="none"
          />
        ))}

        <Animated.View
          style={[styles.sweepContainer, { transform: [{ rotate: interpolateSweep }] }]}
        >
          <Svg width={radarRadius * 2} height={radarRadius * 2}>
            <Path
              d={`M ${radarRadius} ${radarRadius} L ${radarRadius} 0 A ${radarRadius} ${radarRadius} 0 0 1 ${radarRadius * 2} ${radarRadius} Z`}
              fill={colors.RadarScanner}
            />
          </Svg>
        </Animated.View>
      </Svg>
      {renderScannedDevices()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible'
  },
  sweepContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'visible'
  },
});

export default RadarScanner;