const express = require("express");
const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getFriends, getFriendRequests } = require("../controllers/friendController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/send-request", authMiddleware, sendFriendRequest);
router.post("/accept-request", authMiddleware, acceptFriendRequest);
router.post("/reject-request", authMiddleware, rejectFriendRequest);
router.get("/friends", authMiddleware, getFriends);
router.get("/friend-requests", authMiddleware, getFriendRequests);

module.exports = router;
