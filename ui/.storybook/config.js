import { configure } from '@storybook/react';

import { configureViewport } from '@storybook/addon-viewport'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// const newViewports = {
//   iphonex: {
//     name: 'iPhone X',
//     styles: {
//       height: '1218px',
//       width: '563px',
//     },
//     type: 'mobile',
//   }
// }

// configureViewport({
//   viewports: {
//     ...INITAIL_VIEWPORTS,
//     ...newViewports
//   }
// })

// configureViewport({
//   defaultViewport: 'iphonex'
// })

configure(loadStories, module);
