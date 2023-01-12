import React from 'react';
import {Block} from '../components';
import {t1, t2} from '../components/theme/fontsize';
export const divider = () => {
  return (
    <Block
      flex={false}
      borderWidth={[0, 0, 1, 0]}
      borderColorDeafult
      margin={[t1, 0, t2]}
    />
  );
};
