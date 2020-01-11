import React, { useRef, useState } from "react";
import BaseButton from "./BaseButton";
import LoadingOverlay from "./LoadingOverlay";
import LabeledInput from "./LabeledInput";
import { connect } from "react-redux";
import { createExpense } from "../actions";
import { Store } from "../types";
import LabeledSelect from "./LabeledSelect";
import {
  Trip,
  CreateExpenseBody,
  Category
} from "../../../functions/src/generalTypes";

interface Props {
  creatingExpense: boolean;
  trips: Array<Trip>;
  categories: Category[];
  createExpense: (payload: CreateExpenseBody) => any;
}

const NewExpense: React.FC<Props> = ({
  creatingExpense,
  createExpense,
  trips,
  categories
}) => {
  const defaults = {
    category: "",
    date: "2020-12-12",
    name: "",
    description: "",
    price: "",
    tripId: "",
    categoryId: ""
  };
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );
  const [selectedTrip, setSelectedTrip] = useState<string | undefined>("");

  const tripField = useRef<HTMLSelectElement>(null);
  const categoryField = useRef<HTMLSelectElement>(null);
  const dateField = useRef<HTMLInputElement>(null);
  const nameField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLInputElement>(null);
  const priceField = useRef<HTMLInputElement>(null);

  return (
    <LoadingOverlay active={creatingExpense}>
      <div className="flex flex-col items-center mb-4">
        <LabeledSelect
          label="Trip name"
          options={trips.map(trip => ({ key: trip.id, name: trip.name }))}
          handleChange={e =>
            setSelectedTrip(e.target.options[e.target.selectedIndex].dataset.id)
          }
          ref={tripField}
        />
        <LabeledSelect
          label="Category"
          options={categories.map(category => ({
            key: category.id,
            name: category.name
          }))}
          handleChange={e =>
            setSelectedCategory(
              e.target.options[e.target.selectedIndex].dataset.id
            )
          }
          ref={categoryField}
        />
        <LabeledInput
          label="Date"
          type="date"
          ref={dateField}
          defaultValue={defaults.date}
        />
        <LabeledInput label="Title" type="text" ref={nameField} />
        <LabeledInput label="Description" type="text" ref={descriptionField} />
        <LabeledInput label="Value" type="text" ref={priceField} />

        <BaseButton
          cssClasses="mt-4"
          disabled={creatingExpense}
          clickHandler={() =>
            createExpense({
              tripId: selectedTrip || defaults.tripId,
              categoryId: selectedCategory || defaults.categoryId,
              name: nameField?.current?.value || defaults.name,
              date: dateField?.current?.value || defaults.date,
              description:
                descriptionField?.current?.value || defaults.description,
              price: priceField?.current?.value || defaults.price
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
  trips: state.trips,
  categories: state.categories
});

const mapDispatchToProps = {
  createExpense
};

export default connect(mapStateToProps, mapDispatchToProps)(NewExpense);
