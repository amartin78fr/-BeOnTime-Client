import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {Text, Block} from '.';
import Icon from 'react-native-vector-icons/Ionicons';
const Search = ({placeholder}) => {
  return (
    <Block
      flex={false}
      center
      row
      white
      border={[10, 10, 10, 10]}
      margin={[hp(1), 0]}
      padding={[hp(1), 20, hp(1), wp(4)]}>
      <Icon name="ios-search-outline" size={30} color={'grey'} />
      <Input
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="grey"
      />
    </Block>
  );
};
Search.propTypes = {
  placeholder: PropTypes.string,
};
Search.defaultProps = {
  placeholder: 'what are you looking for ?',
};
const Input = styled.TextInput({
  marginLeft: wp(3),
  fontSize: 16,
  color: 'grey',
});
export default Search;
