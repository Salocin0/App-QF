import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';
import useDynamicColors from '../../Styles/useDynamicColors';

export function Counter() {
  const Colors = useDynamicColors();
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          accessibilityLabel="increment"
          style={{
            width: 44,
            height: 44,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            borderWidth: 1,
            borderColor: Colors?.Gris || 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors?.Blanco,
          }}
          onPress={() => dispatch(increment())}
        >
          <Text style={{ fontSize: 20, color: Colors.Negro, fontWeight: '700' }}>+</Text>
        </TouchableOpacity>
        <View
          style={{
            minWidth: 48,
            height: 44,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: Colors?.Gris || 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors?.Blanco,
          }}
        >
          <Text style={{ fontSize: 18, color: Colors.Negro }}>{count}</Text>
        </View>
        <TouchableOpacity
          accessibilityLabel="decrement"
          style={{
            width: 44,
            height: 44,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            borderWidth: 1,
            borderColor: Colors?.Gris || 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors?.Blanco,
          }}
          onPress={() => dispatch(decrement())}
        >
          <Text style={{ fontSize: 20, color: Colors.Negro, fontWeight: '700' }}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
