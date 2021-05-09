import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import * as api from '../../src/api/index'
import {NotificationContainer, NotificationManager} from 'react-notifications';

import { App } from '../../../client/src/app/index'
import { MainApp } from '../../../client/src/pages'

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
