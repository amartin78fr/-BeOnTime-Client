import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import ImageComponent from './ImageComponent';

export default function Rating({rating, starSize = 22}) {
  const filledStars = Math.floor(rating);
  const maxStars = Array(5 - filledStars).fill('star_u_icon');
  const r = [...Array(filledStars).fill('star_s_icon'), ...maxStars];

  return (
    <View style={styles.rating}>
      {r.map((type, index) => {
        return (
          <ImageComponent
            key={index}
            name={type}
            height={starSize}
            width={starSize}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
  },
});
