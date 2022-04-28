/**
 * Favorite.tsx
 * Renders the screen that shows the favorite series cards
 */

import React, { memo } from 'react';
import { Text } from 'react-native';

//Translation
import { translate } from '../locales';

//Main Functional Component
const Favorite = () => {
  return (
    <Text>{translate('Favorite')}</Text>
  );
};

export default memo(Favorite);