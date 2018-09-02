
import React from 'react'
import { shallow, mount } from 'enzyme'

import AvatarSelector from './avatar'

describe('<AvatarSelector />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<AvatarSelector />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should displays 24 avatars', () => {
    const wrapper = mount(
      <AvatarSelector
      />
    )
    const input = wrapper.find('.am-grid-item-content')
    expect(input).toHaveLength(24)
  })
})