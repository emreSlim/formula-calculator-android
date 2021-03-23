import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function CustomButton({
  title,
  onPress,
  color = '#4af',
  style,
  textStyle,
  iconSource,
  iconStyle,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{...styles.container, backgroundColor: color, ...style}}
      onPress={onPress}>
      <>
        {iconSource ? (
          <Image
            style={{...styles.icon, ...iconStyle}}
            source={iconSource}
            fadeDuration={0}
          />
        ) : undefined}
        {title ? (
          <Text style={{...styles.text, ...textStyle}}>
            {title.toUpperCase()}
          </Text>
        ) : undefined}
      </>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 3,
  },
  container: {
    height: 40,
    flexDirection: 'row',
    width: 'auto',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 10,
    lineHeight: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    tintColor: '#fff',
    borderRadius: 3,
    margin: 5,
    width: 30,
    height: 30,
  },
});
