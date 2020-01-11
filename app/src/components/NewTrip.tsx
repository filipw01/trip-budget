import React, { useRef } from "react";
import { connect } from "react-redux";
import { createTrip } from "../actions/trip";
import BaseButton from "./BaseButton";
import LoadingOverlay from "./LoadingOverlay";
import LabeledInput from "./LabeledInput";
import { Store } from "../types";
import { CreateTripBody } from "../../../functions/src/generalTypes";

interface Props {
  createTrip: (payload: CreateTripBody) => void;
  loading: boolean;
}

const NewTrip: React.FC<Props> = ({ createTrip, loading }) => {
  const nameField = useRef<HTMLInputElement>(null);
  const startDateField = useRef<HTMLInputElement>(null);
  const endDateField = useRef<HTMLInputElement>(null);
  const townField = useRef<HTMLInputElement>(null);

  const defaults = {
    name: "",
    startDate: "2020-12-12",
    endDate: "2020-12-13",
    town: ""
  };

  return (
    <LoadingOverlay active={loading}>
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
          disabled={loading}
          clickHandler={() =>
            createTrip({
              name: nameField?.current?.value || defaults.name,
              startDate: startDateField?.current?.value || defaults.startDate,
              endDate: endDateField?.current?.value || defaults.endDate,
              town: townField?.current?.value || defaults.town
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
  loading: state.loading
});

const mapDispatchToProps = {
  createTrip
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTrip);
