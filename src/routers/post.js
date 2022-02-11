const express = require("express");
const router = express.Router();
const {
    createPost,
    getpostsByUser,
    updatePost,
    deletePosts,
    updateComment,
    deleteComments,
    getAllPosts
} = require("../controllers/post");

router.post("/", createPost);

router.get("/", getAllPosts);
router.get("/user/:user", getpostsByUser);

router.put("/:id", updatePost);
router.delete("/:id", deletePosts)

router.put("/:id/comment/:commentId", updateComment);
router.delete("/:id/comment/:commentId", deleteComments);

module.exports = router;