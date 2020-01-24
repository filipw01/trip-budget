import React from "react";
import { Message } from "../../../functions/src/generalTypes";
import { connect } from "react-redux";
import { Store } from "../types";
import BaseMessage from "../components/BaseMessage";

interface Props {
  messages: Array<Message>;
}

const MessagesHandler: React.FC<Props> = ({ messages }) => {
  return (
    <div>
      {messages.map(message => (
        <BaseMessage message={message} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: Store) => ({
  messages: state.messages
});

export default connect(mapStateToProps, {})(MessagesHandler);
