import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const SkeletonComponent = ({children, white, style, ...rest}) => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  return (
    <ShimmerPlaceHolder
      shimmerColors={
        white
          ? [
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 0.5) 50%',
              'rgba(255, 255, 255, 0) 80%',
            ]
          : [
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, 0.4) 50%',
              'rgba(0, 0, 0, 0) 80%',
            ]
      }
      shimmerStyle={{borderRadius: 10}}
      style={
        white
          ? {backgroundColor: '#ced4da', ...style}
          : {backgroundColor: '#202020', ...style}
      }
      {...rest}>
      {children}
    </ShimmerPlaceHolder>
  );
};

SkeletonComponent.propTypes = {
  children: PropTypes.shape(PropTypes.element),
};

SkeletonComponent.defaultProps = {
  children: null,
};

export default SkeletonComponent;
