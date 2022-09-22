import React, { useContext,useEffect } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { GradientContext } from '../context/GradientContext'
import { useFade } from '../hooks/useFade'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const GradientBackground = ({ children }: Props) => {

  const { colors, prevColors, _setPrevColors } = useContext(GradientContext);

  const { opacity,fadeIn } = useFade();
    fadeIn(() => {
      _setPrevColors(colors);
    }); 
  useEffect(() => {
    
  }, [colors])
  
  return (
    <View
      style={{ flex: 1, backgroundColor: '#084F6A' }}
    >
      <Animated.View
        style={{ ...StyleSheet.absoluteFillObject, opacity }}
      >
        <LinearGradient
          colors={[prevColors.primary, prevColors.secondary, 'black']}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
      </Animated.View>
      {children}
    </View>
  )
}
