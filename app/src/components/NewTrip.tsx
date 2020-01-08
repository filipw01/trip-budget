import React, { useRef } from "react";
import { connect } from "react-redux";
import { createTrip } from "../actions";
import BaseButton from "./BaseButton";
import LoadingOverlay from "./LoadingOverlay";
import LabeledInput from "./LabeledInput";
import { Store } from "../types";

interface Props {
  createTrip: Function;
  creatingTrip: boolean;
}

const NewTrip: React.FC<Props> = ({ createTrip, creatingTrip }) => {
  const nameField = useRef<HTMLInputElement>(null);
  const startDateField = useRef<HTMLInputElement>(null);
  const endDateField = useRef<HTMLInputElement>(null);
  const townField = useRef<HTMLInputElement>(null);

  return (
    <LoadingOverlay active={creatingTrip}>
      <div className="flex flex-col items-center mb-4">
        <LabeledInput label="Trip name" type="text" ref={nameField} />
        <LabeledInput
          label="Start date"
          type="date"
          ref={startDateField}
          defaultValue={"2020-12-20"}
        />
        <LabeledInput
          label="End date"
          type="date"
          ref={endDateField}
          defaultValue={"2020-12-20"}
        />
        <LabeledInput label="Town" type="text" ref={townField} />

        <BaseButton
          cssClasses="mt-4"
          disabled={creatingTrip}
          clickHandler={() =>
            createTrip({
              tripName: nameField?.current?.value,
              dateStart: startDateField?.current?.value,
              dateEnd: endDateField?.current?.value,
              town: townField?.current?.value
            })
          }
        >
          Create Trip
        </BaseButton>
      </div>
    </LoadingOverlay>
  );
};
const mapStateToProps = (state: Store) => ({
  creatingTrip: state.creatingTrip
});

const mapDispatchToProps = {
  createTrip
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTrip);
