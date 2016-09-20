// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

// ------------------------------------
// Actions
// ------------------------------------

export function addTransaction (newTransaction) {
  return function (dispatch) {
    // This is where we would usually make our server call.
    // Instead we are just going to go through the motions. To scale this solution we would simply need to change this to an actual POST and
    // then get the new transaction from the response.
    return dispatch({
      type: ADD_TRANSACTION,
      newTransaction
    })
  }
}

export const actions = {
  addTransaction
}

// ------------------------------------
// Reducer
// ------------------------------------

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


export default function transactionsReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_TRANSACTION:
      // We have to add the new item ourselves since we're not actually dealing with a server
      let newTransactions = state.transactions.slice();
      let newTransaction = action.newTransaction;
      newTransactions.push(newTransaction);
      let newBalance = state.balance;

      if (newTransaction.type == "deposit"){
        newBalance += parseFloat(newTransaction.amount);
      } else if (newTransaction.type == "withdrawal") {
        newBalance -= parseFloat(newTransaction.amount);
      }

      return {
        ...state,
        transactions: newTransactions,
        balance: newBalance
      };
    default:
      return state;
  }
}
