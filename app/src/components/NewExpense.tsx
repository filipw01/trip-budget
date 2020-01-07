import React, { useRef, ChangeEvent, useState } from "react";
import BaseButton from "./BaseButton";
import LoadingOverlay from "./LoadingOverlay";
import LabeledInput from "./LabeledInput";
import { connect } from "react-redux";
import { createExpense } from "../actions";
import { Store, Trip } from "../reducers";
import LabeledSelect from "./LabeledSelect";

interface Props {
  creatingExpense: boolean;
  trips: Array<Trip>;
  createExpense: Function;
}

const NewExpense: React.FC<Props> = ({
  creatingExpense,
  createExpense,
  trips
}) => {
  const [currentTrip, setCurrentTrip] = useState<string>(trips[0]?.tripName);

  const nameField = useRef<HTMLSelectElement>(null);
  const categoryField = useRef<HTMLSelectElement>(null);
  const dateField = useRef<HTMLInputElement>(null);
  const titleField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLInputElement>(null);
  const priceField = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setCurrentTrip(e.target.value);

  return (
    <LoadingOverlay active={creatingExpense}>
      <div className="flex flex-col items-center mb-4">
        <LabeledSelect
          label="Trip name"
          options={trips.map(trip => trip.tripName)}
          ref={nameField}
          handleChange={handleChange}
        />
        <LabeledSelect
          label="Category"
          options={
            trips
              .find(trip => trip.tripName === currentTrip)
              ?.expenses.map(expense => expense.name) || []
          }
          ref={categoryField}
        />
        <LabeledInput label="Date" type="date" ref={dateField} defaultValue={"2020-12-20"} />
        <LabeledInput label="Title" type="text" ref={titleField} />
        <LabeledInput label="Description" type="text" ref={descriptionField} />
        <LabeledInput label="Value" type="text" ref={priceField} />

        <BaseButton
          cssClasses="mt-4"
          disabled={creatingExpense}
          clickHandler={() =>
            createExpense({
              tripName: nameField?.current?.value,
              date: dateField?.current?.value,
              title: titleField?.current?.value,
              description: descriptionField?.current?.value,
              price: priceField?.current?.value,
              category: categoryField?.current?.value
            })
          }
        >
          Create Expense
        </BaseButton>
      </div>
    </LoadingOverlay>
  );
};

const mapStateToProps = (state: Store) => ({
  creatingExpense: state.creatingExpense,
  trips: state.trips
});

const mapDispatchToProps = {
  createExpense
};

export default connect(mapStateToProps, mapDispatchToProps)(NewExpense);
