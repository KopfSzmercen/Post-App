import React, { useState } from "react";
import { useAppSelector } from "../../store/stateHooks";
import { RootState } from "../../store/store";
import { useHistory } from "react-router-dom";
import fetchPosts from "./fetchPosts";
import { useEffect, useCallback } from "react";
import { post } from "./fetchPosts";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import PostCard from "../../components/post/PostCard";
import { grey } from "@mui/material/colors";
import MyDrawer from "../../components/drawer/MyDrawer";
import BigPostCard from "../../components/post/BigPostCard";

const MainPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState<post[] | []>([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isExpanded, setIsExpanded] = useState<null | post>(null);

  const { authToken, isLoggedIn, userId } = useAppSelector(
    (state: RootState) => {
      return {
        authToken: state.auth.authToken,
        isLoggedIn: state.auth.isLoggedIn,
        userId: state.auth.userId
      };
    }
  );

  if (!isLoggedIn || !authToken) history.replace("/login");

  const getUserPosts = useCallback(async () => {
    setIsRequesting(true);
    const response = await fetchPosts(authToken!);
    setIsRequesting(false);
    if (!response.success) {
      setPosts([]);
    }
    if (response.status === 403) {
      history.replace("/login");
    }
    if (response.posts) {
      setPosts(response.posts);
    }
  }, [authToken, history]);

  useEffect(() => {
    if (!isLoggedIn || authToken === "") {
      history.replace("/login");
    }
    if (isLoggedIn && authToken) {
      getUserPosts();
    }
  }, [getUserPosts, isLoggedIn, authToken, history]);

  if (isExpanded) {
    const foundPost = posts.find((post) => isExpanded._id === post._id);

    if (foundPost) {
      return (
        <BigPostCard
          title={foundPost.title}
          description={foundPost.description}
          creatorName={foundPost.creatorName}
          likes={foundPost.likes.length}
          isLiked={foundPost.likes.includes(userId!) ? true : false}
          createdAt={new Date(foundPost.createdAt)}
          key={foundPost._id}
          postId={foundPost._id}
          authToken={authToken!}
          expand={setIsExpanded}
        />
      );
    }
  }

  return (
    <>
      <MyDrawer />
      <Container
        sx={{
          display: "grid",
          placeItems: "center",
          marginTop: "50px",
          paddingBottom: "25px"
        }}
      >
        <Typography variant="h4" color={grey[50]} fontWeight={800}>
          {posts.length === 0 && !isRequesting
            ? "NO POSTS TO SHOW"
            : "POSTS LIST"}
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: "25px" }}>
          {isRequesting && (
            <CircularProgress color="purple" sx={{ margin: "auto" }} />
          )}
          {posts.length > 0 &&
            posts.map((post) => {
              return (
                <PostCard
                  title={post.title}
                  description={post.description}
                  creatorName={post.creatorName}
                  likes={post.likes.length}
                  isLiked={post.likes.includes(userId!) ? true : false}
                  createdAt={new Date(post.createdAt)}
                  key={post._id}
                  postId={post._id}
                  expand={setIsExpanded}
                />
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;
