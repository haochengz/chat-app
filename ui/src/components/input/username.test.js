
import React from 'react'
import UsernameInput from './username'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

describe('<UsernameInput />', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<UsernameInput />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should emit value to the parent component', () => {
    let valueMock
    const inputMock = v => valueMock = v
    const wrapper = shallow(
      <UsernameInput
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
      <UsernameInput
        onChange={change}
      />
    )
    const input = wrapper.find('InputItem')
    input.simulate('change', 'test')
    expect(errors).toBeTruthy()
  })

  it('should emit an empty array reprents with no error if inputs are valid', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    const wrapper = shallow(
      <UsernameInput
        onChange={change}
      />
    )
    const input = wrapper.find('InputItem')
    input.simulate('change', 'michael')
    expect(errors).toEqual([])
  })

  it('should emit an array that contains mutiple errors if inputs had mutiple errors', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    const wrapper = shallow(
      <UsernameInput
        onChange={change}
      />
    )
    const input = wrapper.find('InputItem')
    input.simulate('change', 'i@me')
    expect(errors.length).toEqual(2)
  })

  it('should clean the error once change the value to an valid value', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    const wrapper = shallow(
      <UsernameInput
        onChange={change}
      />
    )
    const input = wrapper.find('InputItem')
    input.simulate('change', 'i@me')
    input.simulate('change', 'iandme')
    expect(errors).toEqual([])
  })

  it('should had no error if the input box are emptyand it was never changed yet', () => {
    let errors = null
    function change(v, e) {
      errors = e
    }
    shallow(
      <UsernameInput
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
      <UsernameInput
        onChange={change}
      />
    )
    const input = wrapper.find('InputItem')
    input.simulate('change', 'test')
    input.simulate('change', '')
    expect(errors.length).toBe(2)
  })

  it('should works', () => {
    let wrapper = shallow(
      <UsernameInput
      />
    )
    const input = wrapper.find('InputItem')
    expect(wrapper).toBe(input)
  })
})
