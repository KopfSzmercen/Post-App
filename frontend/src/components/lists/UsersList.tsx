import List from "@mui/material/List";
import { Paper } from "@mui/material";
import { friendData } from "../../pages/friendsPage/fetchFriends";
import UserListItem from "./UserListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const UsersList: React.FC<{ friends: friendData[]; areFriends: boolean }> = (
  props
) => {
  const authToken =
    useSelector((state: RootState) => state.auth.authToken) || "";

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "450px",
        margin: "25px auto",
        overflowY: "scroll",
        maxHeight: "500px"
      }}
    >
      <List sx={{ padding: "10px" }}>
        {props.friends.map((friend) => {
          return (
            <UserListItem
              username={friend.username}
              userId={friend.id}
              email={friend.email}
              key={friend.id}
              isFriend={props.areFriends}
              authToken={authToken}
              isSentRequest={friend.isSentRequest}
            />
          );
        })}
      </List>
    </Paper>
  );
};

export default UsersList;
