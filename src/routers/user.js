const express = require("express");
const router = express.Router();
const {
    createUser,
    updateUser,
    updateProfile,
    deleteUser
} = require("../controllers/user");

router.post("/", createUser);
router.put("/:id", updateUser);
router.put("/profile/:id", updateProfile);
router.delete("/:userId", deleteUser);

module.exports = router;