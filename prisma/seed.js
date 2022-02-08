const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function seed(){
    await createUser();
    await createProfile();
    await createPosts();
    await createComments();
    await createCategories();
    process.exit(0);
}

// create a user================
async function createUser () {
    const user = await prisma.user.create({
        data: {
            username: "hannah68",
            email: "hannah@gmail.com",
            password: "hannah"
        }
    })
    console.log("user created", user);
    return user;
}

// create a profile=======================
async function createProfile () {
    const profile = await prisma.profile.create({
        data: {
            firstName: "hannah",
            lastName: "naderi",
            age: 32,
            pictureUrl: "http://www.hanahpic.com"
        }
    })
    console.log("profile created", profile);
    return profile;
}

// create post==================
async function createPosts () {
    const initialPosts = [
        {
            title: "How did I change my career?",
            content: "when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            imageUrl: "www.career.com",
            publishedAt: "2022-02-08T10:41:10.011Z"
        },
        {
            title: "Why do you need to change your career?",
            content: "letters, as opposed to using 'Content here, content here', making it look like readable English.",
            imageUrl: "www.careersde.com",
            publishedAt: "2021-02-08T10:41:10.011Z"
        }
    ];

    const posts = [];
    for(const post of initialPosts){
        const eachPost = await prisma.post.create({
            data: post
        });
        posts.push(eachPost);
    }
    console.log("post created", posts);
    return posts;
}

// create comments=========================
async function createComments () {
    const initialComments = [
        {content: "I agee with you"},
        {content: "I love your post"}
    ]
    const comments = [];
    for(const comment of initialComments){
        const eachComment = await prisma.comment.create({
            data: comment
        });
        comments.push(eachComment);
    }
    console.log("comments created", comments);
    return comments;
}

// create categories======================
async function createCategories () {
    const initialCategories = [
        {name: "career"},
        {name: "web developer"}
    ]
    const categories = [];
    for(const category of initialCategories){
        const eachCategory = await prisma.category.create({
            data: category
        });
        categories.push(eachCategory);
    }
    console.log("categories created", categories);
    return categories;
}


seed()
    .catch(async(err) => {
        console.error(err);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));