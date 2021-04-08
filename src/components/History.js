import {Animated, Pressable, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from './CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function History({
  width,
  histoyContainerHeight,
  historyArray,
  setHistoryArray,
  toggleHistory,
}) {
  const listWidth = useState(new Animated.Value(width))[0];

  function clearHistory() {
    Animated.timing(listWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setHistoryArray([]);
      listWidth.setValue(width);
      toggleHistory();
    });
  }

  useEffect(() => {
    AsyncStorage.getItem('histoy').then(data =>
      data ? setHistoryArray(JSON.parse(data)) : undefined,
    );
  }, [setHistoryArray]);

  useEffect(() => {
    AsyncStorage.setItem('histoy', JSON.stringify(historyArray));
  }, [historyArray]);
  return (
    <Animated.View
      style={{
        ...styles.container,
        height: histoyContainerHeight,
        width: width,
      }}>
      {historyArray.length > 0 ? (
        <>
          <Animated.FlatList
            contentContainerStyle={styles.contentContainer}
            style={{...styles.list, width: listWidth}}
            keyExtractor={(item, idx) => idx}
            data={historyArray}
            renderItem={({item}) => (
              <Pressable style={styles.listItem}>
                <Text
                  numberOfLines={Math.ceil(item.input.length / 45)}
                  style={styles.input}>
                  {item.input}
                </Text>
                <Text numberOfLines={1} style={styles.output}>
                  = {item.output}
                </Text>
              </Pressable>
            )}
          />
          <CustomButton
            title="CLEAR HISTORY"
            color="#480"
            onPress={clearHistory}
            style={{height: '10%', marginVertical: 5}}
          />
        </>
      ) : (
        <Text>Calculation history will appear here.</Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  list: {
    borderRightWidth: 1,
    borderColor: '#444',
    backgroundColor: '#000',
  },
  contentContainer: {
    marginRight: 10,
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingVertical: 10,
    alignItems: 'flex-end',
  },
  input: {
    fontSize: 16,
  },
  output: {
    fontSize: 25,
    color: '#af6',
  },
});
