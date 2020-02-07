import React from "react";
import { Message } from "../../../functions/src/generalTypes";
import { connect } from "react-redux";
import { dismissMessage } from "../redux/messages";

interface Props {
  message: Message;
  dismissMessage: Function;
}

const BaseMessage: React.FC<Props> = ({ message, dismissMessage }) => {

    let messageClass = " "
    switch (message.type) {
        case "warning":
            messageClass += "bg-yellow-300"
            break;
        case "success":
            messageClass += "bg-green-300"
            break;
        case "info":
            messageClass += "bg-blue-300"
            break;
        case "error":
            messageClass += "bg-red-300"
            break;
        default:
            break;
    }

  return (
    <div className={messageClass} key={message.id} onClick={() => dismissMessage(message.id)}>
      {message.content}
    </div>
  );
};

const mapDispatchToProps = {
  dismissMessage
};

export default connect(null, mapDispatchToProps)(BaseMessage);
