import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MyDrawer from "../../components/drawer/MyDrawer";
import UsersList from "../../components/lists/UsersList";
import { RootState } from "../../store/store";
import fetchFriendsList from "./fetchFriends";
import { friendData } from "./fetchFriends";

const FriendsPage = () => {
  const history = useHistory();
  const [friends, setFriends] = useState<friendData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authToken, isLoggedIn } = useSelector((state: RootState) => {
    return {
      authToken: state.auth.authToken || "",
      isLoggedIn: state.auth.isLoggedIn
    };
  });

  const getFriends = useCallback(async () => {
    setIsLoading(true);
    const response = await fetchFriendsList(authToken);
    setIsLoading(false);
    if (response.success && response.friends) {
      setFriends(response.friends);
    }
  }, [authToken]);

  useEffect(() => {
    if (!isLoggedIn || authToken === "") {
      history.replace("/login");
    }
    getFriends();
  }, [getFriends, authToken, isLoggedIn, history]);

  if (isLoading) {
    return (
      <>
        <MyDrawer />
        <Container
          sx={{ margin: "100px auto", display: "grid", placeItems: "center" }}
        >
          <CircularProgress color="purple" size={70} />
        </Container>
      </>
    );
  }

  if (friends.length === 0) {
    return (
      <>
        <MyDrawer />
        <Container
          sx={{ margin: "100px auto", display: "grid", placeItems: "center" }}
        >
          <Typography variant="h4" color="#fafafa" fontWeight="bold">
            You have no friends yet
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <MyDrawer />
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            margin: "60px auto"
          }}
        >
          <Grid item xs={12} md={6} gap={2}>
            <Typography
              variant="h5"
              align="center"
              color="#fafafa"
              fontWeight="bold"
            >
              Your friends
            </Typography>

            <UsersList friends={friends} areFriends={true} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FriendsPage;
