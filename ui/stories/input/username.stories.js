
import React from 'react'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import UsernameInput from '../../src/components/input/username'


storiesOf('UsernameInput', module)
  .add('display', () => (
    <UsernameInput />
  ))
