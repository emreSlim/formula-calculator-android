import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Digit from './CustomDigitOrOperatorButton';
import Operator from './CustomDigitOrOperatorButton';
import calculate from '../functions/calculate';
import History from './History';

const chars = ['1', '2', '3', '.', '4', '5', '6', '0', '7', '8', '9'];

//special operator chars '÷', '×'

export default function DigitsAndOperatorContainer({
  setInput,
  histoyContainerHeight,
  toggleHistory,
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
    <View style={styles.mainContainer}>
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
        textStyle={{fontSize: 70, bottom: 7, color: '#af6'}}
        onPress={subtractPressHandler}
      />
      <Operator
        title="+"
        textStyle={styles.operatorTextStyle}
        onPress={addPressHandler}
      />

      {chars.map(char => (
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
      <History
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 10,
    // position: 'absolute',
    width: '100%',
  },
  operatorTextStyle: {
    color: '#af6',
    fontSize: 60,
    bottom: 2,
  },
});
