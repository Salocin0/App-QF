import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar as solidStar, faStar as regularStar } from '@fortawesome/free-solid-svg-icons';
import useDynamicColors from '@/Styles/useDynamicColors';

const StarsBar = ({ pregunta = "pregunta", rating, onRatingChange }) => {
  const Colors = useDynamicColors();

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? solidStar : regularStar}
          color={i <= rating ? Colors?.NaranjaDetalle : Colors?.Gris}
          size={25}
          style={{ marginHorizontal: 11 }}
        />
      );
    }
    return stars;
  };

  return (
    <View style={{ height: 80, alignItems: 'center', position: 'relative' }}>
      <Text style={{ color: Colors?.Negro, fontSize: 20, marginBottom: 5 }}>{pregunta}</Text>
      <View style={{ flexDirection: 'row' }}>{renderStars()}</View>
      <Slider
        style={{ width: 200, position: 'absolute', top: 35, opacity: 0 }}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={rating}
        onValueChange={onRatingChange}
        minimumTrackTintColor={Colors?.NaranjaDetalle}
        maximumTrackTintColor={Colors?.Gris}
        thumbTintColor={Colors?.NaranjaDetalle}
      />
    </View>
  );
};

export default StarsBar;
