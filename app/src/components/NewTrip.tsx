import React, { useRef } from "react";
import { connect } from "react-redux";
import { createTrip } from "../actions/trip";
import { showMessage } from "../actions/messages";
import BaseButton from "./BaseButton";
import FileInput from "./FileInput";
import LoadingOverlay from "./LoadingOverlay";
import LabeledInput from "./LabeledInput";
import { Store } from "../types";
import { CreateTripBody, Message } from "../../../functions/src/generalTypes";
import firebase from "firebase/app";
import "firebase/storage";
import { generateId } from "../helpers";

interface Props {
  showMessage: (payload: Message) => any;
  createTrip: (payload: CreateTripBody) => void;
  loading: boolean;
}

const NewTrip: React.FC<Props> = ({ createTrip, loading, showMessage }) => {
  const nameField = useRef<HTMLInputElement>(null);
  const startDateField = useRef<HTMLInputElement>(null);
  const endDateField = useRef<HTMLInputElement>(null);
  const townField = useRef<HTMLInputElement>(null);
  const backgroundField = useRef<HTMLInputElement>(null);

  const defaults = {
    name: "",
    startDate: "2020-12-12",
    endDate: "2020-12-13",
    town: ""
  };

  const handleSubmit = () => {
    const tripFile = backgroundField?.current?.files?.[0];
    if (tripFile !== undefined) {
      const storeRef = firebase.storage().ref();

      storeRef
        .child(tripFile.name)
        .put(tripFile as File)
        .then(async snapshot => {
          const backgroundUrl = await snapshot.ref.getDownloadURL();
          createTrip({
            name: nameField?.current?.value ?? defaults.name,
            startDate: startDateField?.current?.value ?? defaults.startDate,
            endDate: endDateField?.current?.value ?? defaults.endDate,
            town: townField?.current?.value ?? defaults.town,
            backgroundUrl
          });
        })
        .catch(error => {
          showMessage({ type: "error", content: error, id: generateId() });
        });
    } else {
      createTrip({
        name: nameField?.current?.value ?? defaults.name,
        startDate: startDateField?.current?.value ?? defaults.startDate,
        endDate: endDateField?.current?.value ?? defaults.endDate,
        town: townField?.current?.value ?? defaults.town,
        backgroundUrl: null
      });
    }
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
        <FileInput text="Dodaj zdjęcie podróży" ref={backgroundField} />
        <BaseButton
          cssClasses="mt-4"
          disabled={loading}
          clickHandler={handleSubmit}
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
  createTrip,
  showMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTrip);
