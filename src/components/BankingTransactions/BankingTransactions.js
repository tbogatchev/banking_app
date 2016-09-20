import React from 'react'
import classes from './BankingTransactions.scss'

export class BankingTransactions extends React.Component {

  constructor(props) {
    super(props);
  }

  onInputChange(e){
    const value = e.target.value;
    const name = e.target.name;
    let stateObject = {};
    stateObject[name] = value;
    this.setState(stateObject);
  }

  onItemSubmit(type){
    var date = new Date().toLocaleDateString('en-GB', {
      day : 'numeric',
      month : 'short',
      year : 'numeric'
    }).split(' ').join('-');

    const {origin, amount} =  this.state;
    const newTransaction = {type, date, origin, amount};
    // We could obviously run some validations here, but for the sake of simplicity we'll assume that all additions are valid.
    this.props.addTransaction(newTransaction);
  }

  render() {
    const {
      transactions,
      balance
    } = this.props;

    return (
      <div>

        <div className={`${classes.tableRow} ${classes.squeezeMiddleContainer}`}>
          <div className={`${classes.tableColumn} ${classes.tableColumnHeader}`}>Total Balance: </div>
          <div className={`${classes.tableColumn} ${classes.tableColumnHeader}`}>{parseCurrency(balance)}</div>
        </div>

        <div className="ui divider"></div>

        <div className={classes.tableRow}>
          <div className={`${classes.tableColumn} ${classes.tableColumnHeader}`}>Type</div>
          <div className={`${classes.tableColumn} ${classes.tableColumnHeader}`}>Origin/Destination</div>
          <div className={`${classes.tableColumn} ${classes.tableColumnHeader}`}>Date</div>
          <div className={`${classes.tableColumn} ${classes.tableColumnHeader}`}>Amount</div>
        </div>

        { transactions.map((transaction, index) => {
          return (
            <div key={index} className={classes.tableRow}>
              <div className={classes.tableColumn}>{transaction.type}</div>
              <div className={classes.tableColumn}>{transaction.origin}</div>
              <div className={classes.tableColumn}>{transaction.date}</div>
              <div className={classes.tableColumn}>{parseCurrency(transaction.amount)}</div>
            </div>
          );
        })}

        <div className="ui divider"></div>

        <div className={classes.squeezeMiddleContainer}>
          <div className={classes.tableRow}>
            <div className={`${classes.tableColumn} ${classes.tableColumnHeader}`}>Origin/Destination: </div>
            <div className={`${classes.tableColumn} ui input`}><input name="origin" onChange={this.onInputChange.bind(this)}/></div>
          </div>
          <div className={classes.tableRow}>
            <div className={`${classes.tableColumn} ${classes.tableColumnHeader}`}>Amount: </div>
            <div className={`${classes.tableColumn} ui input`}><input name="amount" onChange={this.onInputChange.bind(this)}/></div>
          </div>
          <div className={`${classes.tableRow} ${classes.buttonGroup}`}>
            <div className={classes.tableColumn}><button className="ui green basic button" onClick={this.onItemSubmit.bind(this, "deposit")}>Deposit</button></div>
            <div className={classes.tableColumn}><button className="ui red basic button" onClick={this.onItemSubmit.bind(this, "withdrawal")}>Withdraw</button></div>
          </div>
        </div>
      </div>
    )
  }
}

const parseCurrency = (amount) => {
  const parsedAmount = parseFloat(amount).toFixed(2)
  return("$" + parsedAmount);
}

BankingTransactions.propTypes = {
  addTransaction: React.PropTypes.func.isRequired,
}

export default BankingTransactions
