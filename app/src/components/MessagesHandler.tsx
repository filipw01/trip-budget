import React from "react";
import { Message } from "../../../functions/src/generalTypes";
import { connect } from "react-redux";
import { Store } from "../types";
import { dismissMessage } from "../actions/messages";

interface Props {
  messages: Array<Message>;
  dismissMessage: Function;
}

const MessagesHandler: React.FC<Props> = ({ messages, dismissMessage }) => {
  return (
    <div>
      {messages.map(message => (
        <div key={message.id} onClick={()=>dismissMessage(message.id)}>{message.content}</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: Store) => ({
  messages: state.messages
});

const mapDispatchToProps = {
  dismissMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesHandler);
