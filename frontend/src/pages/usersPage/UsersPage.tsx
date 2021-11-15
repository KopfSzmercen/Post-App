import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MyDrawer from "../../components/drawer/MyDrawer";
import UsersList from "../../components/lists/UsersList";
import { RootState } from "../../store/store";
import fetchUsers, { userData } from "./fetchUsers";

const UsersPage = () => {
  const history = useHistory();
  const { authToken, isLoggedIn } = useSelector((state: RootState) => {
    return {
      authToken: state.auth.authToken || "",
      isLoggedIn: state.auth.isLoggedIn
    };
  });
  const [users, setUsers] = useState<userData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = useCallback(async () => {
    setIsLoading(true);
    const result = await fetchUsers(authToken);
    setIsLoading(false);
    if (result.success) {
      setUsers(result.users!);
    }
  }, [authToken]);

  useEffect(() => {
    if (!isLoggedIn || authToken === "") {
      history.replace("/login");
    }
    getUsers();
  }, [getUsers, isLoggedIn, authToken, history]);

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

  if (users.length === 0) {
    return (
      <>
        <MyDrawer />
        <Container
          sx={{ margin: "100px auto", display: "grid", placeItems: "center" }}
        >
          <Typography variant="h3" fontWeight="bold" color="#fafafa">
            No users to show
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
              Other users
            </Typography>

            <UsersList friends={users} areFriends={false} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UsersPage;
