import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';
import useDynamicColors from './../../../Styles/useDynamicColors';

export function Counter() {
  const Colors = useDynamicColors();
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderWidth: 1,
            borderColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.GrisClaro, // Color de fondo del botón
          }}
          onPress={() => dispatch(decrement())}
        >
          <Text style={{ fontSize: 20, color: Colors.Negro }}>-</Text>
        </TouchableOpacity>
        <View
          style={{
            width: 50,
            height: 40,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.Blanco, // Color de fondo del contador
          }}
        >
          <Text style={{ fontSize: 20, color: Colors.Negro }}>{count}</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderWidth: 1,
            borderColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.GrisClaro,
          }}
          onPress={() => dispatch(increment())}
        >
          <Text style={{ fontSize: 20, color: Colors.Negro }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
