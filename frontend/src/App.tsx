import { Container } from "@mui/material";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import FriendsPage from "./pages/friendsPage/FriendsPage";
import UsersPage from "./pages/usersPage/UsersPage";
import MessagesPage from "./pages/messagesPage/MessagesPage";
import AddPostPage from "./pages/AddPostPage";
import NewMessage from "./pages/NewMessage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Container>
      <Switch>
        <Route path={"/"} exact>
          <RegisterPage />
        </Route>
        <Route path={"/login"} exact>
          <LoginPage />
        </Route>
        <Route path={"/mainPage"} exact>
          <MainPage />
        </Route>
        <Route path={"/friends"} exact>
          <FriendsPage />
        </Route>
        <Route path={"/users"} exact>
          <UsersPage />
        </Route>
        <Route path={"/messages"} exact>
          <MessagesPage />
        </Route>
        <Route path={"/addPost"} exact>
          <AddPostPage />
        </Route>
        <Route path={"/newMessage/:receiverId"}>
          <NewMessage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
