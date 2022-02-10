const express = require("express");
const router = express.Router();
const {createComment, updateComment} = require("../controllers/comment");

router.post("/", createComment);
router.put("/:commentId", updateComment);

module.exports = router;