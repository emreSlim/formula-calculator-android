import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Digit from './CustomDigitOrOperatorButton';
import Operator from './CustomDigitOrOperatorButton';
import calculate from '../functions/calculate';
import History from './History';

const chars1stRow = ['1', '2', '3', '.'];

const chars2ndRow = ['4', '5', '6', '0'];

const chars3rdRow = ['7', '8', '9'];

//special operator chars '÷', '×'
const {width} = Dimensions.get('window');

export default function DigitsAndOperatorContainer({
  setInput,
  histoyContainerHeight,
  toggleHistory,
  setDigitsContainersDimensions,
  digitsContainerDimension,
}) {
  const [historyArray, setHistoryArray] = useState([]);

  function digitOrDecimalPressHandler(char) {
    if (/\d/.test(char)) {
      setInput(pre => (pre === '0' || !/[\d-]/.test(pre) ? char : pre + char));
    } else {
      //when decimal button is pressed
      setInput(pre => {
        if (!/\d/.test(pre)) {
          return '0.';
        } else if (/\d*\.\d*$/.test(pre)) {
          return pre;
        } else if (!/\d$/.test(pre)) {
          return pre + '0.';
        } else if (!/\d/.test(pre)) {
          return '0.';
        } else {
          return pre + '.';
        }
      });
    }
  }

  function dividePressHandler() {
    setInput(pre => pre.replace(/\D+$|$/, '÷'));
  }
  function multiplyPressHandler() {
    setInput(pre => pre.replace(/\D+$|$/, '×'));
  }
  function subtractPressHandler() {
    setInput(pre =>
      pre === '0'
        ? '-'
        : /[\d÷×+]$/.test(pre)
        ? pre + '-'
        : pre.replace(/\D+$|$/, '-'),
    );
  }
  function addPressHandler() {
    setInput(pre => pre.replace(/\D+$|$/, '+'));
  }

  function equalsPressHandler() {
    setInput(pre => {
      pre = pre.replace(/\D$/, '');
      let outcome = calculate(pre);
      if (pre !== outcome) {
        setHistoryArray(arr => {
          return [...arr, {input: pre, output: outcome}];
        });
      }
      return outcome;
    });
  }

  return (
    <View
      style={styles.mainContainer}
      onLayout={e =>
        setDigitsContainersDimensions({
          height: e.nativeEvent.layout.height * 1,
          width: e.nativeEvent.layout.width * 1,
        })
      }>
      <View style={styles.row}>
        <Operator
          title="÷"
          textStyle={styles.operatorTextStyle}
          onPress={dividePressHandler}
        />
        <Operator
          title="×"
          textStyle={styles.operatorTextStyle}
          onPress={multiplyPressHandler}
        />
        <Operator
          title="−"
          textStyle={styles.operatorTextStyle}
          onPress={subtractPressHandler}
        />
        <Operator
          title="+"
          textStyle={styles.operatorTextStyle}
          onPress={addPressHandler}
        />
      </View>
      <View style={styles.row}>
        {chars1stRow.map(char => (
          <Digit
            title={char}
            key={char}
            onPress={() => {
              digitOrDecimalPressHandler(char);
            }}
          />
        ))}
      </View>
      <View style={styles.row}>
        {chars2ndRow.map(char => (
          <Digit
            title={char}
            key={char}
            onPress={() => {
              digitOrDecimalPressHandler(char);
            }}
          />
        ))}
      </View>
      <View style={styles.row}>
        {chars3rdRow.map(char => (
          <Digit
            title={char}
            key={char}
            onPress={() => {
              digitOrDecimalPressHandler(char);
            }}
          />
        ))}
        <Operator
          title="="
          color="#480"
          textStyle={{fontSize: 60, bottom: 2}}
          onPress={equalsPressHandler}
        />
      </View>

      <History
        width={digitsContainerDimension.width}
        histoyContainerHeight={histoyContainerHeight}
        historyArray={historyArray}
        setHistoryArray={setHistoryArray}
        toggleHistory={toggleHistory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    // position: 'absolute',
    width: '100%',
  },
  operatorTextStyle: {
    color: '#af6',
    fontSize: width / 7,
    bottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
