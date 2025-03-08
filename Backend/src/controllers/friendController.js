const User = require("../models/User");

// Send Friend Request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user.id;

    if (userId === friendId) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself" });
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (friend.friends.includes(userId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    if (friend.friendRequests.includes(userId)) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    friend.friendRequests.push(userId);
    await friend.save();

    res.json({ message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Accept Friend Request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({ message: "No friend request from this user" });
    }

    // Add each other as friends
    user.friends.push(friendId);
    friend.friends.push(userId);

    // Remove friend request
    user.friendRequests = user.friendRequests.filter((id) => id.toString() !== friendId);

    await user.save();
    await friend.save();

    res.json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Reject Friend Request
exports.rejectFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({ message: "No friend request from this user" });
    }

    user.friendRequests = user.friendRequests.filter((id) => id.toString() !== friendId);
    await user.save();

    res.json({ message: "Friend request rejected" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Friends List
exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("friends", "username email profilePicture");
    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Friend Requests
exports.getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("friendRequests", "username email profilePicture");
    res.json(user.friendRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
