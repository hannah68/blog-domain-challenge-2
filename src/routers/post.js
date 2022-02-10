const express = require("express");
const router = express.Router();
const {
    createPost,
    getpostsByUser,
    updatePost,
    deletePosts
} = require("../controllers/post");

router.post("/", createPost);
router.get("/user/:user", getpostsByUser);
router.put("/:id", updatePost);
router.delete("/:id", deletePosts)
module.exports = router;