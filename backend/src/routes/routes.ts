import { Router } from "express";
import { postRegister, postLogin } from "../controllers/login-register";
import authMiddleware from "../auth/authMiddleware";
import refreshToken from "../auth/refreshToken";
import logout from "../auth/logout";
import getMainPage from "../controllers/pages/mainPage";
import addPost from "../controllers/actions/addPost";
import sendMessage from "../controllers/actions/sendMessage";
import handleMessage from "../controllers/actions/handleMessage";
import { postAction } from "../controllers/postsActions/likePost";
import getFirendsList from "../controllers/pages/friendsPage";
import getOtherUsers from "../controllers/pages/usersPage";
import getUserMessages from "../controllers/pages/messagesPage";
import getSinglePost from "../controllers/postsActions/getSinglePost";

const router = Router();

router.post("/register", postRegister);
router.post("/login", postLogin);

router.post("/refreshToken", refreshToken);
router.delete("/logout", authMiddleware, logout);

router.get("/posts", authMiddleware, getMainPage);
router.post("/addPost", authMiddleware, addPost);
router.patch("/posts/", authMiddleware, postAction);
router.get("/post/:postId", authMiddleware, getSinglePost);

router.get("/friends", authMiddleware, getFirendsList);
router.get("/users", authMiddleware, getOtherUsers);

router.post("/sendMessage", authMiddleware, sendMessage);
router.post("/message/", authMiddleware, handleMessage);
router.get("/messages", authMiddleware, getUserMessages);

export default router;
