import {
  ADD_TRANSACTION,
  addTransaction,
  default as transactionsReducer
} from 'routes/BankingTransactions/modules/bankingTransactions'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const initialState = {
  // get us started with some example items.
  // We'll treat dates as string for simplicity
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
  balance: 150.00
};

const newTransaction = {
  type: "deposit",
  origin: "grandma's check",
  amount: 300.00,
  date: "19-Sep-2016"
};

describe('(Redux Module) BankingTransactions', () => {
  it('Should export a constant ADD_TRANSACTION.', () => {
    expect(ADD_TRANSACTION).to.equal('ADD_TRANSACTION')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(transactionsReducer).to.be.a('function')
    })

    it('Should initialize with a state ', () => {
      expect(transactionsReducer(undefined, {})).to.eql(initialState)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = transactionsReducer(undefined, {})
      expect(state).to.eql(initialState)
      state = transactionsReducer(state, { type: '@@@@@@@' })
      expect(state).to.eql(initialState);
    })
  })

  describe('(Action Creator) addTransaction', () => {
    it('Should be exported as a function.', () => {
      expect(addTransaction).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(addTransaction(newTransaction)).to.be.a('function')
    })

    it('state should have the right action.', () => {
      const store = mockStore(initialState);

      const expectedActions = [
        { type: ADD_TRANSACTION,  newTransaction}
      ]

      store.dispatch(addTransaction(newTransaction));
      expect(store.getActions()).to.eql(expectedActions);
    })

    it('should update the transactions correctly.', () => {
      let state = transactionsReducer(undefined, {});
      let newState = transactionsReducer(state, {
        type: ADD_TRANSACTION,
        newTransaction
      });
      expect(newState.transactions.length).to.equal(3);
      expect(newState.balance).to.equal(450);
    })
  })

})
