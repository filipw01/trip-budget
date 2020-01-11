import React, { useRef } from "react";
import { connect } from "react-redux";
import { deleteCategory, updateCategory } from "../actions/category";
import BaseButton from "./BaseButton";
import { Store } from "../types";
import LabeledInput from "./LabeledInput";
import {
  DeleteCategoryBody,
  Category,
  UpdateCategoryBody
} from "../../../functions/src/generalTypes";

interface Props {
  categories: Array<Category>;
  deleteCategory: (payload: DeleteCategoryBody) => any;
  updateCategory: (payload: UpdateCategoryBody) => any;
}

const CategoriesList: React.FC<Props> = ({
  categories,
  deleteCategory,
  updateCategory
}) => {
  const nameField = useRef<HTMLInputElement>(null);
  const colorField = useRef<HTMLInputElement>(null);

  return (
    <ul className="max-w-sm">
      {categories.map(category => (
        <li
          className="flex justify-between px-6 py-4 border border-gray-700"
          key={category.id}
        >
          <LabeledInput
            label="Category name"
            type="text"
            defaultValue={category.name}
            ref={nameField}
          />
          <LabeledInput
            label="Category color"
            type="text"
            defaultValue={category.color}
            ref={colorField}
          />
          <BaseButton
            clickHandler={() =>
              updateCategory({
                id: category.id,
                name: nameField?.current?.value || category.name,
                color: colorField?.current?.value || category.color
              })
            }
          >Update category</BaseButton>
          {category.name}
          <BaseButton clickHandler={() => deleteCategory({ id: category.id })}>
            Delete
          </BaseButton>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state: Store) => ({
  categories: state.categories
});

const mapDispatchToProps = {
  deleteCategory,
  updateCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
