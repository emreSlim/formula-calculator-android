import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import calculate from '../functions/calculate';

export default function InputBox({input, setInput}) {
  function inputChangeHandler(val) {
    val = val.replace(/×/g, '*');
    val = val.replace(/÷/g, '/');
    val = val.replace(/[^0-9+\-*/\s.e]/g, '');
    if (
      val &&
      !/^[+*/]|\D(?=e)|e(?=e)|e(?=[\d/*])|^e|e[+-](?=\D)|\d+e[+-]\d+(?=e)|\/(?=[*/+])|\*(?=[*/+])|\+(?=[*/+])|-(?=\D)|\.(?=[./*\-+])|e[-+]\d+(?=\.)|\d+\.\d+\.$/.test(
        val,
      )
    ) {
      val = val.replace(/\*/g, '×');
      val = val.replace(/\//g, '÷');
      setInput(val);
    } else if (!val) {
      setInput('');
    } else {
      //error handling
    }
  }

  function submitHandler() {
    setInput(pre => calculate(pre));
  }
  return (
    <TextInput
      onSubmitEditing={submitHandler}
      style={styles.textInput}
      value={input}
      onChangeText={inputChangeHandler}
      multiline={true}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderRightWidth: 1,
    borderColor: '#444',

    fontWeight: 'bold',
    fontSize: 60,
    textAlign: 'right',
    color: '#fff',
    flex: 1,
    paddingHorizontal: 10,
  },
});
