import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Pressable,
  StatusBar,
  StyleSheet,
} from 'react-native';
import ActionButtonContainer from './src/components/ActionButtonContainer';
import DigitsAndOperatorContainer from './src/components/DigitsAndOperatorContainer';
import NavigationBar from 'react-native-navbar-color';
import InputBox from './src/components/InputBox';

NavigationBar.setColor('#000000');

const {width} = Dimensions.get('window');

export default function App() {
  const [input, setInput] = useState('0');

  const [isHistoryDisplayed, setHistoryDisplay] = useState(false);

  const [digitsContainerDimension, setDigitsContainersDimensions] = useState({
    height: 0,
    width: width - 20,
  });

  const histoyContainerHeight = useState(new Animated.Value(0))[0];

  function toggleHistory(timeLength = 1000) {
    Animated.timing(histoyContainerHeight, {
      toValue: isHistoryDisplayed ? 0 : digitsContainerDimension.height,
      duration: timeLength,
      useNativeDriver: false,
    }).start();
    setHistoryDisplay(pre => !pre);
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.mainContainer}>
      <>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <InputBox input={input} setInput={setInput} />
        <ActionButtonContainer
          toggleHistory={toggleHistory}
          setInput={setInput}
        />
        <DigitsAndOperatorContainer
          setInput={setInput}
          histoyContainerHeight={histoyContainerHeight}
          toggleHistory={toggleHistory}
          setDigitsContainersDimensions={setDigitsContainersDimensions}
          digitsContainerDimension={digitsContainerDimension}
        />
      </>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000',
    padding: 10,
    paddingTop: 40,
  },
});
