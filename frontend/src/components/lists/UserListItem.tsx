import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button
} from "@mui/material";

import { pink } from "@mui/material/colors";
import { Box } from "@mui/system";
import sendInvitation from "./sendInvitation";
import { useHistory } from "react-router-dom";

const UserListItem: React.FC<{
  username: string;
  userId: string;
  email: string;
  isFriend: boolean;
  authToken: string;
  isSentRequest: boolean;
}> = (props) => {
  const initialDisabled = !props.isFriend && props.isSentRequest;
  const [buttonDisabled, setButtonDisabled] = useState(initialDisabled);
  const history = useHistory();

  const goToSendMessage = () => {
    history.push(`/newMessage/${props.userId}`);
  };

  const sendRequest = async () => {
    const result = await sendInvitation(props.authToken, props.userId);

    if (result.success) {
      setButtonDisabled(true);
    } else {
      console.log(result.error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: pink[500] }}>
            {props.username[0].toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.username}
          secondary={
            props.email.length < 15
              ? props.email
              : props.email.substring(0, 13) + ".."
          }
        />
      </ListItem>

      {props.isFriend && (
        <Button
          variant="contained"
          color="purple"
          size="small"
          onClick={goToSendMessage}
        >
          Send a message
        </Button>
      )}

      {!props.isFriend && (
        <Button
          variant="contained"
          color="purple"
          size="small"
          onClick={sendRequest}
          disabled={buttonDisabled}
        >
          Add to friends
        </Button>
      )}
    </Box>
  );
};

export default UserListItem;
