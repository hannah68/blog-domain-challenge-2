const express = require("express");
const router = express.Router();
const {
    createPost,
    getpostsByUser
} = require("../controllers/post");

router.post("/", createPost);
router.get("/user/:user", getpostsByUser);

module.exports = router;