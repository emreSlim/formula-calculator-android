import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import CustomButton from './CustomActionButton';

const {width} = Dimensions.get('window');

export default function ActionButtonContainer({setInput, toggleHistory}) {
  function backspace() {
    setInput(pre => (pre.length === 1 ? '0' : pre.slice(0, -1)));
  }
  function clearAll() {
    setInput('0');
  }

  return (
    <View style={styles.container}>
      <CustomButton
        onPress={toggleHistory}
        style={styles.flex}
        iconSource={require('../icons/history.png')}
      />
      <CustomButton
        style={styles.flex}
        title="AC"
        textStyle={{color: '#a44'}}
        onPress={clearAll}
      />
      <View style={{...styles.flex}} />
      <CustomButton
        style={styles.flex}
        onPress={backspace}
        iconSource={require('../icons/clear.png')}
        iconStyle={{width: width / 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flex: {
    width: width / 5,
  },
});
