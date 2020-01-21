import React, { useRef } from "react";
import BaseButton from "./BaseButton";
import LabeledInput from "./LabeledInput";
import { connect } from "react-redux";
import { createCategory } from "../actions/category";
import { CreateCategoryBody } from "../../../functions/src/generalTypes";

interface Props {
  createCategory: (payload: CreateCategoryBody) => any;
}

const NewCategory: React.FC<Props> = ({ createCategory }) => {
  const defaults = {
    name: "",
    color: ""
  };
  const nameField = useRef<HTMLInputElement>(null);
  const colorField = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center mb-4">
      <LabeledInput label="Category name" type="text" ref={nameField} />
      <LabeledInput label="color" type="text" ref={colorField} />

      <BaseButton
        cssClasses="mt-4"
        clickHandler={() =>
          createCategory({
            name: nameField?.current?.value ?? defaults.name,
            color: colorField?.current?.value ?? defaults.color
          })
        }
      >
        Create Expense
      </BaseButton>
    </div>
  );
};

const mapDispatchToProps = {
  createCategory
};

export default connect(null, mapDispatchToProps)(NewCategory);
