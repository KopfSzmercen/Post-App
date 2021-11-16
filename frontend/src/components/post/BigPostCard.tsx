import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import handleLikePost from "./handleLikePost";
import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  Box,
  CardActions,
  IconButton,
  Container,
  Button
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { purple, grey, red } from "@mui/material/colors";
import MyDrawer from "../drawer/MyDrawer";

const BigPostCard: React.FC<{
  title: string;
  description: string;
  creatorName: string;
  likes: number;
  createdAt: Date;
  isLiked: boolean;
  postId: string;
  authToken: string;
  expand: (arg: any) => void;
}> = (props) => {
  const [action, setAction] = useState(!props.isLiked ? "LIKE" : "DISLIKE");
  const [likesNumber, setLikesNumber] = useState(props.likes);
  const [isSending, setIsSending] = useState(false);
  const history = useHistory();

  const toggleLike = async () => {
    if (isSending) return;
    setIsSending(true);
    const result = await handleLikePost(props.postId, action, props.authToken!);
    setIsSending(false);
    if (!result.success) {
      if (result.error) {
        console.log(result.error);
        if (result.error === 403) {
          history.replace("/login");
        }
      }
      return;
    }
    const newAction = action === "LIKE" ? "DISLIKE" : "LIKE";
    setAction(newAction);
    setLikesNumber(result.newLikesNumber!);
  };

  const closeExpand = () => {
    props.expand(null);
  };

  return (
    <Container>
      <MyDrawer />
      <Card sx={{ maxWidth: 400, margin: "70px auto" }} key={props.postId}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: purple[500] }} aria-label="user">
              {props.creatorName[0].toUpperCase()}
            </Avatar>
          }
          title={props.title}
          subheader={`Created by: ${
            props.creatorName
          } \n ${props.createdAt.toLocaleDateString()}`}
        ></CardHeader>
        <CardContent>
          <Typography variant="body2">{props.description}</Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ display: "flex" }}>
            <IconButton aria-label="add to favorites" onClick={toggleLike}>
              <Favorite
                sx={{
                  color: action === "DISLIKE" ? red[700] : grey[500]
                }}
              />
              <Typography>{likesNumber}</Typography>
            </IconButton>
          </Box>
        </CardActions>
      </Card>

      <Box sx={{ margin: "auto", textAlign: "center" }}>
        <Button
          variant="contained"
          color="purple"
          size="large"
          onClick={closeExpand}
        >
          Go back
        </Button>
      </Box>
    </Container>
  );
};

export default BigPostCard;
