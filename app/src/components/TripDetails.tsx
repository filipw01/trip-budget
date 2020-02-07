import React, { useEffect } from "react";
import { Store } from "../types";
import BaseButton from "./BaseButton/BaseButton";
import UpdateTrip from "./UpdateTrip";
import { connect } from "react-redux";
import { deleteExpense, getExpenses } from "../redux/expense";
import UpdateExpense from "./UpdateExpense";
import {
  DeleteExpenseBody,
  GetExpensesBody,
  Trip,
  Expense
} from "../../../functions/src/generalTypes";

interface Props {
  trip: Trip;
  expenses: Array<Expense>;
  deleteExpense: (payload: DeleteExpenseBody) => any;
  getExpenses: (payload: { offset: number } & GetExpensesBody) => any;
}

const TripDetails: React.FC<Props> = ({
  trip,
  deleteExpense,
  getExpenses,
  expenses
}) => {
  useEffect(() => {
    getExpenses({ tripId: trip.id, offset: 0 });
  }, [getExpenses, trip.id]);
  return (
    <div>
      <UpdateTrip trip={trip} />
      <div>{trip.name}</div>
      <div>{trip.startDate}</div>
      <div>{trip.endDate}</div>
      <div>{trip.town}</div>
      {expenses.map(expense => (
        <div className="m-4" key={expense.name}>
          <UpdateExpense expense={expense} trip={trip} />
          <p>{expense.name}</p>
          <p>{expense.date}</p>
          <p>{expense.description}</p>
          <p>{expense.price}</p>
          <BaseButton
            clickHandler={() =>
              deleteExpense({
                tripId: trip.id,
                expenseId: expense.id
              })
            }
          >
            Delete
          </BaseButton>
        </div>
      ))}
      <BaseButton
        clickHandler={() =>
          getExpenses({ tripId: trip.id, offset: expenses.length })
        }
      >
        More
      </BaseButton>
    </div>
  );
};

const mapStateToProps = (state: Store) => ({
  expenses: state.expenses
});

const mapDispatchToProps = {
  deleteExpense,
  getExpenses
};

export default connect(mapStateToProps, mapDispatchToProps)(TripDetails);
