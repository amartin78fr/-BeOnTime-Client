import React from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Block from './Block';
import Text from './Text';
import {light} from './theme/colors';
import {t1} from './theme/fontsize';
const componentStyles = () => {
  return StyleSheet.create({
    button: {
      borderRadius: 5,
      justifyContent: 'center',
      marginVertical: t1,
      borderWidth: 1,
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    disabledButton: {
      backgroundColor: '#00000052',
      borderWidth: 0,
    },
    circular: {
      borderRadius: 20,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
    },
    accent: {backgroundColor: 'red', borderColor: light.warning},
    primary: {
      backgroundColor: 'transparent',
      paddingVertical: t1 * 1.5,
      borderColor: light.secondary,
    },
    secondary: {
      backgroundColor: light.secondary,
      borderColor: light.secondary,
      paddingVertical: t1 * 1.5,
    },
    facebook: {
      backgroundColor: light.facebook,
      borderColor: light.facebook,
      paddingVertical: t1 * 1.5,
    },
    // tertiary: {backgroundColor: colors.tertiary},
    // black: {backgroundColor: colors.black},
    // white: {backgroundColor: colors.white},
    // gray: {backgroundColor: colors.gray},
    // gray2: {backgroundColor: colors.gray2},
    // gray3: {backgroundColor: colors.gray3},
    // gray4: {backgroundColor: colors.gray4},
  });
};

const Button = ({
  style,
  opacity,
  gradient,
  color,
  startColor,
  endColor,
  end,
  start,
  locations,
  shadow,
  children,
  icon,
  circular,
  size,
  isLoading,
  disabled,
  borderColor,
  textStyle,
  ...rest
}) => {
  const styles = componentStyles();

  const buttonStyles = [
    styles.button,
    borderColor && {borderColor},
    disabled && shadow && styles.shadow,
    circular && styles.circular,
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && {backgroundColor: color}, // custom backgroundColor
    style,
  ];

  if (icon) {
    return <Block style={buttonStyles}>{icon}</Block>;
  }
  const renderTextColor = () => {
    if (color === 'secondary') {
      return '#fff';
    } else if (color === 'facebook') {
      return '#fff';
    } else if (disabled) {
      return '#fff';
    }
    return light.secondary;
  };
  return (
    <TouchableOpacity
      style={[buttonStyles, disabled && styles.disabledButton]}
      disabled={!!disabled}
      activeOpacity={disabled ? opacity || 0.8 : 0.2}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text
          semibold
          style={textStyle}
          center
          h1
          size={size || 16}
          color={renderTextColor()}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: '#FFF',
};

export default Button;
