import React, { memo } from 'react';
import { Text} from 'react-native';

//Translation
import { translate } from '../locales';

const Search = () => {
  return (
    <Text>{translate('Search')}</Text>
    );
};

export default memo(Search);