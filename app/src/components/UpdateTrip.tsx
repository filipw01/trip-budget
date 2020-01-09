import React, { useRef } from "react";
import { updateTrip } from "../actions";
import { Trip } from "../types";
import { connect } from "react-redux";
import LabeledInput from "./LabeledInput";
import BaseButton from "./BaseButton";

interface Props {
  trip: Trip;
  updateTrip: Function;
}

const UpdateTrip: React.FC<Props> = ({ updateTrip, trip }) => {
  const nameField = useRef<HTMLInputElement>(null);
  const startDateField = useRef<HTMLInputElement>(null);
  const endDateField = useRef<HTMLInputElement>(null);
  const townField = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center mb-4">
      <LabeledInput
        label="Trip name"
        type="text"
        defaultValue={trip.name}
        ref={nameField}
      />
      <LabeledInput
        label="Start date"
        type="date"
        ref={startDateField}
        defaultValue={trip.startDate}
      />
      <LabeledInput
        label="End date"
        type="date"
        ref={endDateField}
        defaultValue={trip.endDate}
      />
      <LabeledInput
        label="Town"
        type="text"
        defaultValue={trip.town}
        ref={townField}
      />

      <BaseButton
        cssClasses="mt-4"
        clickHandler={() =>
          updateTrip({
            name: trip.name,
            newName: nameField?.current?.value,
            startDate: startDateField?.current?.value,
            endDate: endDateField?.current?.value,
            town: townField?.current?.value
          })
        }
      >
        Update
      </BaseButton>
    </div>
  );
};


const mapDispatchToProps = {
  updateTrip
};

export default connect(null, mapDispatchToProps)(UpdateTrip);
