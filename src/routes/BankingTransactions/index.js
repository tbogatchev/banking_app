import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'transactions',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const BankingTransactions = require('./containers/BankingTransactionsContainer').default
      const reducer = require('./modules/bankingTransactions').default

      /*  Add the reducer to the store on key 'transactions'  */
      injectReducer(store, { key: 'transactions', reducer })

      /*  Return getComponent   */
      cb(null, BankingTransactions)

    /* Webpack named bundle   */
    }, 'transactions')
  }
})
