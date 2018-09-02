
import React from 'react'
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import AvatarSelector from '../../src/components/input/avatar'

storiesOf('AvatarSelector', module)
  .add('display', () => (
    <AvatarSelector />
  ))
