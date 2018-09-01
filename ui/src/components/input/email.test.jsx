
import React from 'react'
import EmailInput from './email'
import { shallow, mount } from 'enzyme'

describe('<EmailInput />', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<EmailInput />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should emit value to the parent component', () => {
    let valueMock
    const inputMock = v => valueMock = v
    const wrapper = shallow(
      <EmailInput
        onChange={inputMock}
      />
    )
    const input = wrapper.find('InputItem')
    input.simulate('change', 'test')
    expect(valueMock).toEqual('test')
  })

  it('should emit errors if there is an invalid value in the input box', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    const wrapper = shallow(
      <EmailInput
        onChange={change}
      />
    )
    const input = wrapper.find('InputItem')
    input.simulate('change', 'test')
    expect(errors).toHaveLength(1)
  })

  it('should clean the error once change the value to an valid value', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    const wrapper = shallow(
      <EmailInput
        onChange={change}
      />
    )
    const input = wrapper.find('InputItem')
    input.simulate('change', 'iandme')
    expect(errors).toHaveLength(1)
    input.simulate('change', 'i@me.com')
    expect(errors).toHaveLength(0)
  })

  it('should had no error if the input box are empty and it was never changed yet', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    shallow(
      <EmailInput
        onChange={change}
      />
    )
    expect(errors).toEqual(null)
  })

  it('should emit an error if the input box was changed and then change back to empty', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    const wrapper = shallow(
      <EmailInput
        onChange={change}
      />
    )
    const input = wrapper.find('InputItem')
    input.simulate('change', 'testuser@gmail.com')
    expect(errors).toHaveLength(0)
    input.simulate('change', '')
    expect(errors).toHaveLength(2)
  })

  it('should render an error badge if any errors passing in to the component', () => {
    const wrapper = mount(
      <EmailInput
        errors={['error1', 'error2']}
      />
    )
    expect(wrapper.exists('.am-input-error-extra')).toBe(true)
  })

  it('should no error badge if no errors passing in to the component', () => {
    const wrapper = mount(
      <EmailInput
        errors={[]}
      />
    )
    expect(wrapper.exists('.am-input-error-extra')).toBe(false)
  })

  it('should calls the showErrors method if error badge had been clicked and there are errors in error array', () => {
    const errorHandler = jest.fn()
    const wrapper = mount(
      <EmailInput
        errors={['error1', 'error2']}
      />
    )
    wrapper.instance().showErrors = errorHandler
    wrapper.instance().forceUpdate()
    const errorBadge = wrapper.find('.am-input-error-extra')
    errorBadge.simulate('click')
    expect(errorHandler).toBeCalled()
  })
})