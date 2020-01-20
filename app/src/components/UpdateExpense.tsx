import React, { useRef } from "react";
import { updateExpense } from "../actions/expense";
import { connect } from "react-redux";
import LabeledInput from "./LabeledInput";
import BaseButton from "./BaseButton";
import {
  UpdateExpenseBody,
  Trip,
  Expense
} from "../../../functions/src/generalTypes";

interface Props {
  trip: Trip;
  expense: Expense;
  updateExpense: (payload: UpdateExpenseBody) => any;
}

const UpdateExpense: React.FC<Props> = ({ updateExpense, expense, trip }) => {
  const nameField = useRef<HTMLInputElement>(null);
  const dateField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLInputElement>(null);
  const priceField = useRef<HTMLInputElement>(null);
  const categoryField = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center mb-4">
      <LabeledInput
        label="Expense name"
        type="text"
        defaultValue={expense.name}
        ref={nameField}
      />
      <LabeledInput
        label="Category id"
        type="text"
        defaultValue={expense.categoryId}
        ref={categoryField}
      />
      <LabeledInput
        label="Date"
        type="date"
        ref={dateField}
        defaultValue={expense.date}
      />
      <LabeledInput
        label="Description"
        type="text"
        ref={descriptionField}
        defaultValue={expense.description}
      />
      <LabeledInput
        label="Price"
        type="text"
        defaultValue={expense.price}
        ref={priceField}
      />

      <BaseButton
        cssClasses="mt-4"
        clickHandler={() =>
          updateExpense({
            tripId: trip.id,
            expenseId: expense.id,
            categoryId: categoryField?.current?.value,
            name: nameField?.current?.value,
            date: dateField?.current?.value,
            description: descriptionField?.current?.value,
            price: Number(priceField?.current?.value)
          })
        }
      >
        Update
      </BaseButton>
    </div>
  );
};

const mapDispatchToProps = {
  updateExpense
};

export default connect(null, mapDispatchToProps)(UpdateExpense);
