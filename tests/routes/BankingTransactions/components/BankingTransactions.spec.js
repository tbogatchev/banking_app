import React from 'react'
import { bindActionCreators } from 'redux'
import { BankingTransactions } from 'components/BankingTransactions/BankingTransactions'
import { shallow } from 'enzyme'

describe('(Component) BankingTransactions', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      balance : 150,
      transactions : [
        {
          type: "deposit",
          origin: "Corp Staffing",
          amount: 400.00,
          date: "13-Sep-2016"
        },
        {
          type: "withdrawal",
          origin: "ATM",
          amount: 250.00,
          date: "15-Sep-2016"
        }
      ],
      ...bindActionCreators({
        addTransaction   : (_spies.addTransaction = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<BankingTransactions {..._props} />)
  })

  it('Should render exactly two buttons.', () => {
    expect(_wrapper.find('button')).to.have.length(2)
  })

  describe('A deposit button...', () => {
    let _button

    before(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Deposit')
    })

    it('has semantic classes', () => {
      expect(_button.hasClass('ui green basic button')).to.be.true
    })

  })

  describe('A withdrawal button...', () => {
    let _button

    before(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Withdraw')
    })

    it('has semantic classes', () => {
      expect(_button.hasClass('ui red basic button')).to.be.true
    })
  })
})
