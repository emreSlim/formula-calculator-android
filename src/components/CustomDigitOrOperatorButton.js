import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');

export default function CustomDigitOrOperatorButton({
  title,
  onPress = () => {},
  color = '#222',
  style,
  textStyle,
  iconSource,
  iconStyle,
}) {
  const scale = useState(new Animated.Value(1))[0];
  function pressHandler() {
    onPress();
    Keyboard.dismiss();
  }

  function pressOutHandler() {
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }

  function pressInHandler() {
    Animated.timing(scale, {
      toValue: 0.7,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.container,
        backgroundColor: color,
        ...style,
      }}
      onPressIn={pressInHandler}
      onPressOut={pressOutHandler}
      onPress={pressHandler}>
      <Animated.View style={[{transform: [{scale: scale}]}]}>
        {iconSource ? (
          <Image
            style={{...styles.icon, ...iconStyle}}
            source={iconSource}
            fadeDuration={0}
          />
        ) : undefined}
        {title ? (
          <Text style={{...styles.text, ...textStyle}}>{title}</Text>
        ) : undefined}
      </Animated.View>
    </TouchableOpacity>
  );
}

const buttonSize = width / 5;
const fontSize = width / 8;

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 3,
  },
  container: {
    width: buttonSize,
    height: buttonSize,
    flexDirection: 'row',
    borderRadius: buttonSize,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7,
  },
  text: {
    fontFamily: 'roboto',
    color: '#fff',
    fontSize: fontSize,
  },
  icon: {
    tintColor: '#fff',
    borderRadius: 3,
    width: 40,
    height: 40,
  },
});
