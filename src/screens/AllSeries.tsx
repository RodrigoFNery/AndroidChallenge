import React, { memo } from 'react';
import { Text} from 'react-native';

//Translation
import { translate } from '../locales';

const AllSeries = () => {
  return (
    <Text>{translate('AllSeries')}</Text>
    );
};

export default memo(AllSeries);