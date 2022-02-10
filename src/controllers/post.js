const prisma = require("../utils/prisma");

// create a post================================
const createPost = async (req,res) => {
    const {title, content, imageUrl, publishedAt, categories, userId} = req.body;
    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            imageUrl: imageUrl, 
            publishedAt: publishedAt,
            categories: {
                create: categories.map(category => {
                    return {
                        category: {
                            connectOrCreate: {
                                where: { name: category.name },
                                create: { name: category.name }
                            }
                        }
                    }
                })
            },
            user: {
                connect: {
                    id: parseInt(userId)
                }
            }
        },
        include: {
            categories: true,
            user: true,
            user: {
                include: {
                    profile: true,
                },
            },
        }
    })
    return res.json({data: post});
}

// get limited posts for a specific user by username or id and order it
const getpostsByUser = async (req, res) => {
    const { user } = req.params;

    let num = parseInt(user);
    let userIdValue;
    if(num){
        userIdValue = num
    }
    // get username and find the id
    if(isNaN(num)){
        const userId = getUserName(user);
        userIdValue = userId
    }
   

    const post = await prisma.post.findMany({
        take: 5,
        orderBy:{
            createdAt: "desc"
        },
        where: {
            userId: userIdValue
        },
        include: {
            categories: true,
            comments: true
        }
    })
    return res.json({data: post})
}


const getUserName = async (user) => {
    const userObj = await prisma.user.findUnique({
        where: {
            username: user
        }
    })
    return userObj.id;
}

// update post==================================
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, imageUrl, categories } = req.body;
    
    const updatedPostInfo = {
        title,
        content,
        imageUrl,
    }
    
    const post = await prisma.post.update({
        where: {
            id: parseInt(id)
        },
        data: {
            ...updatedPostInfo,
            categories: {
                create: categories.map(category => { 
                    return {
                        category: {
                            connectOrCreate: {
                                where: { name: category.name },
                                create: { name: category.name }
                            }
                        }
                    }
                })
            }
        },
        include: {
            categories: true
        }
    })
    return res.json({data: post});
}




module.exports = {
    createPost,
    getpostsByUser,
    updatePost
}