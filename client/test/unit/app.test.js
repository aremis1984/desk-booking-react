import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { App } from '../../../client/src/app/index'

//TODO

describe('<App />', () => {
  let sandbox
  beforeEach(function () {
    sandbox = sinon.createSandbox()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render Main app', () => {
    const wrapper = shallow(<App />)
      expect(wrapper.find('h1')).equal('Welcome to Desk Booking')
  })
})
