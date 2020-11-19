import { expect } from 'chai'
import * as rocketchat from 'rocketchat-js-sdk'

describe('index:', () => {
  it('exports all lib members', () => {
    expect(Object.keys(rocketchat)).to.eql([
      'driver',
      'methodCache',
      'api',
      'settings'
    ])
  })
})
