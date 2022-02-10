const prisma = require("../utils/prisma");

const createComment = async(req, res) => {
    const { content, userId, postId, parentId} = req.body;
    let commentData = {
        content
    }
    if(parentId){
        commentData = {...commentData, parentId}
    }
    const comment = await prisma.comment.create({
        data: {
            ...commentData,
            user: {
                connect: {
                    id: userId
                }
            },
            post: {
                connect: {
                    id: postId
                }
            }
        },
        include: {
            post: true
        }
    })
    return res.json({data: comment});
}

// update comment============================
const updateComment = async(req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await prisma.comment.update({
        where: {
            id: parseInt(commentId)
        },
        data: {
            content
        }
    })
    return res.json({data: comment});
}





module.exports = {
    createComment,
    updateComment
}