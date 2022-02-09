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

module.exports = {
    createPost
}