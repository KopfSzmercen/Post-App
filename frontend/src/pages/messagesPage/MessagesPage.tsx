import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MyDrawer from "../../components/drawer/MyDrawer";
import MessageCard from "../../components/messages/MessageCard";
import { RootState } from "../../store/store";
import fetchMessages, { messageData } from "./fetchMessages";

const MessagesPage = () => {
  const history = useHistory();
  const [messages, setMessages] = useState<messageData[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const { authToken, isLoggedIn } = useSelector((state: RootState) => {
    return {
      authToken: state.auth.authToken || "",
      isLoggedIn: state.auth.isLoggedIn
    };
  });

  const getMessages = useCallback(async () => {
    setIsFetching(true);
    const result = await fetchMessages(authToken);
    setIsFetching(false);
    if (result.success) {
      setMessages(result.messages!);
    }
  }, [authToken]);

  useEffect(() => {
    if (!isLoggedIn || authToken === "") {
      history.replace("/login");
    }
    getMessages();
  }, [getMessages, isLoggedIn, authToken, history]);

  if (isFetching) {
    return (
      <>
        <MyDrawer />
        <Box sx={{ textAlign: "center", margin: "70px auto" }}>
          <CircularProgress size={70} color="purple" />
        </Box>
      </>
    );
  }

  if (messages.length === 0) {
    return (
      <>
        <MyDrawer />
        <Container sx={{ marginTop: "70px" }}>
          <Typography
            variant="h4"
            color="#fafafa"
            fontWeight="bold"
            align="center"
          >
            You have no messages
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <MyDrawer />
      <Container sx={{ marginTop: "70px", paddingBottom: "30px" }}>
        <Typography
          variant="h4"
          color="#fafafa"
          fontWeight="bold"
          align="center"
        >
          Your messages
        </Typography>
        <Grid
          container
          sx={{ marginTop: "50px" }}
          gap={3}
          justifyContent="center"
        >
          {messages.map((message) => {
            return (
              <Grid
                item
                xs={12}
                md={4}
                alignItems="center"
                justifyContent="center"
                key={message._id}
              >
                <MessageCard
                  text={message.text}
                  key={message._id}
                  senderName={message.senderName}
                  type={message.action}
                  allMessages={messages}
                  authToken={authToken}
                  messageId={message._id}
                  setMessages={setMessages}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default MessagesPage;
