import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';

export function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderWidth: 1,
            borderColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => dispatch(increment())}
        >
          <Text style={{ fontSize: 16 }}>+</Text>
        </TouchableOpacity>
        <View
          style={{
            width: 30,
            height: 30,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16 }}>{count}</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: 1,
            borderColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => dispatch(decrement())}
        >
          <Text style={{ fontSize: 16 }}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
