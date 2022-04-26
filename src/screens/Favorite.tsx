import React, { memo } from 'react';
import { Text} from 'react-native';

//Translation
import { translate } from '../locales';

const Favorite = () => {
  return (
    <Text>{translate('Favorite')}</Text>
    );
};

export default memo(Favorite);