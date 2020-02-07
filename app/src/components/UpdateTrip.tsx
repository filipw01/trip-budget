import React, { useRef } from "react";
import { updateTrip } from "../redux/trip";
import { showMessage } from "../redux/messages";
import { connect } from "react-redux";
import LabeledInput from "./LabeledInput";
import BaseButton from "./BaseButton/BaseButton";
import {
  UpdateTripBody,
  Trip,
  Message
} from "../../../functions/src/generalTypes";
import firebase from "firebase/app";
import "firebase/storage";
import { generateId } from "../helpers";

interface Props {
  trip: Trip;
  updateTrip: (payload: UpdateTripBody) => any;
  showMessage: (payload: Message) => any;
}

const UpdateTrip: React.FC<Props> = ({ updateTrip, trip, showMessage }) => {
  const nameField = useRef<HTMLInputElement>(null);
  const startDateField = useRef<HTMLInputElement>(null);
  const endDateField = useRef<HTMLInputElement>(null);
  const townField = useRef<HTMLInputElement>(null);
  const backgroundField = useRef<HTMLInputElement>(null);

  const handleUpdate = () => {
    const tripFile = backgroundField?.current?.files?.[0];
    let backgroundUrl;
    if (tripFile !== undefined) {
      firebase
        .storage()
        .ref()
        .child(tripFile.name)
        .put(tripFile as File)
        .then(snapshot => (backgroundUrl = snapshot.downloadURL))
        .catch(error =>
          showMessage({ type: "error", content: error, id: generateId() })
        );
    }
    updateTrip({
      id: trip.id,
      name: nameField?.current?.value,
      startDate: startDateField?.current?.value,
      endDate: endDateField?.current?.value,
      town: townField?.current?.value,
      backgroundUrl
    });
  };

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
      <input type="file" ref={backgroundField} />
      <BaseButton cssClasses="mt-4" clickHandler={handleUpdate}>
        Update
      </BaseButton>
    </div>
  );
};

const mapDispatchToProps = {
  updateTrip,
  showMessage
};

export default connect(null, mapDispatchToProps)(UpdateTrip);
