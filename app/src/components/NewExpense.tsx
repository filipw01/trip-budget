import React, { useRef } from "react";
import BaseButton from "./BaseButton";
import LoadingOverlay from "./LoadingOverlay";
import LabeledInput from "./LabeledInput";
import { connect } from "react-redux";
import { createExpense } from "../actions";
import { Store } from "../reducers";

interface Props {
  creatingExpense: boolean;
  createExpense: Function;
}

const NewExpense: React.FC<Props> = ({ creatingExpense, createExpense }) => {
  const nameField = useRef<HTMLInputElement>(null);
  const dateField = useRef<HTMLInputElement>(null);
  const titleField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLInputElement>(null);
  const valueField = useRef<HTMLInputElement>(null);
  const categoryField = useRef<HTMLInputElement>(null);

  return (
    <LoadingOverlay active={creatingExpense}>
      <div className="flex flex-col items-center mb-4">
        <LabeledInput label="Trip name" type="text" ref={nameField} />
        <LabeledInput label="Date" type="date" ref={dateField} />
        <LabeledInput label="Title" type="text" ref={titleField} />
        <LabeledInput label="Description" type="text" ref={descriptionField} />
        <LabeledInput label="Value" type="text" ref={valueField} />
        <LabeledInput label="Category" type="text" ref={categoryField} />

        <BaseButton
          cssClasses="mt-4"
          disabled={creatingExpense}
          clickHandler={() =>
            createExpense({
              tripName: nameField?.current?.value,
              date: dateField?.current?.value,
              title: titleField?.current?.value,
              description: descriptionField?.current?.value,
              value: valueField?.current?.value,
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
  creatingExpense: state.creatingExpense
});

const mapDispatchToProps = {
  createExpense
};

export default connect(mapStateToProps, mapDispatchToProps)(NewExpense);
