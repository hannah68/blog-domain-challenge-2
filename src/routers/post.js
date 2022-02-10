const express = require("express");
const router = express.Router();
const {
    createPost,
    getpostsByUser,
    updatePost
} = require("../controllers/post");

router.post("/", createPost);
router.get("/user/:user", getpostsByUser);
router.put("/:id", updatePost);

module.exports = router;