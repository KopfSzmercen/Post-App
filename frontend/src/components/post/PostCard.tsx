import { Favorite } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import handleLikePost from "./handleLikePost";
import { useState } from "react";
import { red, grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom";

const PostCard: React.FC<{
  title: string;
  description: string;
  creatorName: string;
  likes: number;
  createdAt: Date;
  isLiked: boolean;
  postId: string;
  expand: (postData: any) => void;
}> = (props) => {
  const descriptionIsLong = props.description.length >= 30;
  const [action, setAction] = useState(!props.isLiked ? "LIKE" : "DISLIKE");
  const [likesNumber, setLikesNumber] = useState(props.likes);
  const [isSending, setIsSending] = useState(false);
  const history = useHistory();

  const authToken =
    useSelector((state: RootState) => state.auth.authToken) || "";
  const readMore = () => {
    props.expand({ ...props, _id: props.postId });
  };

  const toggleLike = async () => {
    if (isSending) return;
    setIsSending(true);
    const result = await handleLikePost(props.postId, action, authToken!);
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
  return (
    <Grid item xs={12} md={4} xl={3} justifyContent="center">
      <Card sx={{ maxWidth: 300, margin: "auto" }} key={props.postId}>
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
          <Typography variant="body2">
            {!descriptionIsLong
              ? props.description
              : props.description.substring(0, 30) + "..."}
          </Typography>
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
          {descriptionIsLong && <Button onClick={readMore}>Read more</Button>}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PostCard;
