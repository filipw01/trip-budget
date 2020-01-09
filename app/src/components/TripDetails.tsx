import React from "react";
import { Trip, ExpenseCategory, Expense } from "../types";
import BaseButton from "./BaseButton";
import UpdateTrip from "./UpdateTrip";
import { connect } from "react-redux";
import { deleteExpense } from "../actions";
import UpdateExpense from "./UpdateExpense";

interface Props {
  trip: Trip;
  deleteExpense: Function;
}

const TripDetails: React.FC<Props> = ({ trip, deleteExpense }) => {
  return (
    <div>
      <UpdateTrip trip={trip} />
      <div>{trip.name}</div>
      <div>{trip.startDate}</div>
      <div>{trip.endDate}</div>
      <div>{trip.town}</div>
      {trip.expenses.map((expenseCategory: ExpenseCategory) => (
        <div className="m-4" key={expenseCategory.name}>
          {expenseCategory.name}
          <div className="m-4">
            {expenseCategory.values.map((expense: Expense) => (
              <div className="m-4" key={expense.title}>
                <UpdateExpense
                  expense={expense}
                  category={expenseCategory.name}
                  trip={trip}
                />
                <p>{expense.title}</p>
                <p>{expense.date}</p>
                <p>{expense.description}</p>
                <p>{expense.price}</p>
                <BaseButton
                  clickHandler={() =>
                    deleteExpense({
                      name: trip.name,
                      category: expenseCategory.name,
                      expenseName: expense.title
                    })
                  }
                >
                  Delete
                </BaseButton>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  deleteExpense
};

export default connect(null, mapDispatchToProps)(TripDetails);
