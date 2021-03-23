import React, {useState} from 'react';
import {
  Animated,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export default function CustomActionButton({
  title,
  onPress = () => {},
  color,
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
    <TouchableHighlight
      onPressIn={pressInHandler}
      onPressOut={pressOutHandler}
      underlayColor="#222"
      style={{...styles.container, backgroundColor: color, ...style}}
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
          <Text style={{...styles.text, ...textStyle}} numberOfLines={1}>
            {title.toUpperCase()}
          </Text>
        ) : undefined}
      </Animated.View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 3,
  },
  container: {
    borderColor: '#222',
    borderBottomWidth: 0.5,
    height: 60,
    width: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 10,
    color: '#888',
    fontFamily: 'Roboto',
    fontSize: 30,
  },
  icon: {
    tintColor: '#888',
    borderRadius: 3,
    margin: 5,
    width: 30,
    height: 30,
  },
});
