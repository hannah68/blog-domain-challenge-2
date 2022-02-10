const express = require("express");
const router = express.Router();
const {
    createUser,
    updateUser,
    updateProfile
} = require("../controllers/user");

router.post("/", createUser);
router.put("/:id", updateUser);
router.put("/profile/:id", updateProfile);

module.exports = router;