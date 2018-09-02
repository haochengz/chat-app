
import React from 'react'
import { shallow, mount } from 'enzyme'

import PasswordComfirmInput from './password-comfirm'

describe('<PasswordComfirmInput />', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<PasswordComfirmInput />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should emit value to the parent component by password input', () => {
    let valueMock
    const inputMock = v => valueMock = v
    const wrapper = shallow(
      <PasswordComfirmInput
        onChange={inputMock}
      />
    )
    const input = wrapper.find({placeholder: 'Password'})
    input.simulate('change', 'test')
    expect(valueMock).toEqual('test')
  })

  it('should stores its own data of password repeated input', () => {
    let valueMock
    const inputMock = v => valueMock = v
    const wrapper = shallow(
      <PasswordComfirmInput
        onChange={inputMock}
      />
    )
    const input = wrapper.find({placeholder: 'Repeat the password'})
    input.simulate('change', 'test')
    expect(wrapper.state('__p')).toBe('test')
    expect(valueMock).toBe('')
  })

  it('should emit errors if there is an invalid value in the password input', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    const wrapper = shallow(
      <PasswordComfirmInput
        onChange={change}
      />
    )
    const input = wrapper.find({placeholder: 'Password'})
    input.simulate('change', 'test')
    expect(errors).toHaveLength(2)
  })

  it('should emit errors then changing the repeat password input', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    const wrapper = shallow(
      <PasswordComfirmInput
        onChange={change}
      />
    )
    const input = wrapper.find({placeholder: 'Repeat the password'})
    input.simulate('change', 'test')
    expect(errors).toHaveLength(3)
  })

  it('should only allow letters, numbers and underscore as the value', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    const wrapper = shallow(
      <PasswordComfirmInput
        onChange={change}
      />
    )
    const input = wrapper.find({placeholder: 'Password'})
    input.simulate('change', 'test%test')
    expect(errors).toHaveLength(2)
  })

  it('should be ok if password entered correctly', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    const wrapper = shallow(
      <PasswordComfirmInput
        onChange={change}
        value={'testtest'}
      />
    )
    const input = wrapper.find({placeholder: 'Repeat the password'})
    input.simulate('change', 'testtest')
    expect(errors).toHaveLength(0)
  })

  it('should render two error badges if any errors passing in to the component', () => {
    const wrapper = mount(
      <PasswordComfirmInput
        errors={['error1', 'error2']}
      />
    )
    expect(wrapper.exists('.am-input-error-extra')).toBe(true)
  })

  it('should no error badge if no errors passing in to the component', () => {
    const wrapper = mount(
      <PasswordComfirmInput
        errors={[]}
      />
    )
    expect(wrapper.exists('.am-input-error-extra')).toBe(false)
  })

  it('should calls the showErrors method if error badge had been clicked and there are errors in error array', () => {
    const errorHandler = jest.fn()
    const wrapper = mount(
      <PasswordComfirmInput
        errors={['error1', 'error2']}
      />
    )
    wrapper.instance().showErrors = errorHandler
    wrapper.instance().forceUpdate()
    const errorBadge = wrapper.find('.am-input-error-extra').at(0)
    errorBadge.simulate('click')
    expect(errorHandler).toBeCalled()
  })
})