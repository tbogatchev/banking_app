import { connect } from 'react-redux'
import { addTransaction } from '../modules/bankingTransactions'
import BankingTransactions from 'components/BankingTransactions'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
  addTransaction
}

const mapStateToProps = (state) => ({
  transactions: state.transactions.transactions,
  balance: state.transactions.balance,
})

export default connect(mapStateToProps, mapActionCreators)(BankingTransactions)
