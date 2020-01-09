import React, { useRef } from "react";
import { updateExpense } from "../actions";
import { Trip, Expense } from "../types";
import { connect } from "react-redux";
import LabeledInput from "./LabeledInput";
import BaseButton from "./BaseButton";

interface Props {
  trip: Trip;
  expense: Expense;
  category: string;
  updateExpense: Function;
}

const UpdateTrip: React.FC<Props> = ({
  updateExpense,
  expense,
  category,
  trip
}) => {
  const newTitleField = useRef<HTMLInputElement>(null);
  const dateField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLInputElement>(null);
  const priceField = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center mb-4">
      <LabeledInput
        label="Expense name"
        type="text"
        defaultValue={expense.title}
        ref={newTitleField}
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
            name: trip.name,
            category: category,
            expenseName: expense.title,
            date: dateField?.current?.value,
            newTitle: newTitleField?.current?.value,
            description: descriptionField?.current?.value,
            price: priceField?.current?.value
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

export default connect(null, mapDispatchToProps)(UpdateTrip);
