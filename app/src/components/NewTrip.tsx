import React, { useRef } from "react";
import { connect } from "react-redux";
import { createTrip } from "../actions";
import BaseButton from "./BaseButton";

interface Props {
  createTrip: Function;
}

const NewTrip: React.FC<Props> = ({ createTrip }) => {
  const textField = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-around h-8 mb-4">
      <input
        className="h-full border-2 border-black rounded-lg"
        type="text"
        ref={textField}
      />
      <BaseButton
        clickHandler={() =>
          createTrip({
            tripName: textField?.current?.value,
            dateStart: "today",
            dateEnd: "tomorrow",
            town: "London"
          })
        }
      >
        Create Trip
      </BaseButton>
    </div>
  );
};

const mapDispatchToProps = {
  createTrip
};

export default connect(null, mapDispatchToProps)(NewTrip);
