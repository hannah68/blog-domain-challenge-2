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


module.exports = {
    createComment
}