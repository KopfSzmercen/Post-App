import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { messageData } from "../../pages/messagesPage/fetchMessages";
import messageRequest from "./messageRequest";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeMessage } from "../../store/authSlice";

const MessageCard: React.FC<{
  text: string;
  senderName: string;
  type: string;
  messageId: string;
  authToken: string;
  allMessages: messageData[];
  setMessages: (data: messageData[]) => void;
}> = (props) => {
  const dispatch = useDispatch();
  const updateMessages = () => {
    const updatedMessagesArr = props.allMessages.filter(
      (message: messageData) => {
        return message._id !== props.messageId;
      }
    );
    props.setMessages(updatedMessagesArr);
  };

  const [isSending, setIsSending] = useState(false);

  const acceptMessage = async () => {
    setIsSending(true);
    const result = await messageRequest(
      props.messageId,
      "accept",
      props.authToken
    );
    setIsSending(false);
    if (result.success) {
      updateMessages();
      dispatch(removeMessage());
    }
  };

  const deleteMessage = async () => {
    setIsSending(true);
    const result = await messageRequest(
      props.messageId,
      "decline",
      props.authToken
    );
    setIsSending(false);
    if (result.success) {
      updateMessages();
      dispatch(removeMessage());
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardHeader title={`From: ${props.senderName}`} />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.text}
        </Typography>
      </CardContent>

      {isSending ? (
        <CircularProgress sx={{ marginLeft: "20px" }} />
      ) : (
        <CardActions sx={{ width: "200px", justifyContent: "space-around" }}>
          {props.type === "TEXT_MESSAGE" && (
            <Button
              size="small"
              variant="contained"
              color="purple"
              onClick={deleteMessage}
              sx={{ marginRight: "auto" }}
            >
              Delete
            </Button>
          )}
          {props.type === "ADD_FRIEND" && (
            <>
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={deleteMessage}
              >
                Decline
              </Button>
              <Button
                size="small"
                variant="contained"
                color="purple"
                onClick={acceptMessage}
              >
                Accept
              </Button>
            </>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default MessageCard;
