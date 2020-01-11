import React, { useRef } from "react";
import { updateTrip } from "../actions/trip";
import { connect } from "react-redux";
import LabeledInput from "./LabeledInput";
import BaseButton from "./BaseButton";
import { UpdateTripBody, Trip } from "../../../functions/src/generalTypes";

interface Props {
  trip: Trip;
  updateTrip: (payload: UpdateTripBody) => any;
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
            id: trip.id,
            name: nameField?.current?.value,
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
