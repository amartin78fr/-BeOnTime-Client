import React from 'react';
import Block from './Block';
import Text from './Text';
import ImageComponent from './ImageComponent';
import {t2} from './theme/fontsize';
import {useSelector} from 'react-redux';

const EmptyFile = ({text}) => {
  const languageMode = useSelector((state) => state.languageReducer.language);

  const {NoData} = languageMode;
  return (
    <Block center middle>
      <ImageComponent name="empty_icon" height="200" width="200" />
      <Text size={16} semibold margin={[t2, 0, 0]}>
        {text || NoData}
      </Text>
    </Block>
  );
};

export default EmptyFile;
