const prisma = require("../utils/prisma");

// create user=========================================
const createUser = async (req,res) => {
    const { username, email, password, profile, userId} = req.body;

    if(profile){
        const user = await createUserWithProfile(username, email, password, profile);
        return res.json({data: user});
    }

    const user = await prisma.user.create({
        data: {
            username : username,
            email: email,
            password: password,
        }
    })
    return res.json({data: user})
}

// create user with profile=============================
const createUserWithProfile = async(username, email, password, profile) => {
    return await prisma.user.create({
        data: {
            username : username,
            email: email,
            password: password,
            profile: {
                create: {
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    age: profile.age,
                    pictureUrl: profile.pictureUrl
                }
            }
        },
        include: {
            profile: true
        }
    })
} 

// update user===================================
const updateUser = async(req, res) => {
    const { id } = req.params;
    const {username, email, password, profile} = req.body;
    const { firstName, lastName, age, pictureUrl} = profile;
    const userObj = {
        username,
        email,
        password
    }
    const profileObj = {
        firstName,
        lastName,
        age,
        pictureUrl
    }
   
    const user = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            ...userObj,
            profile: {
                update: {
                    ...profileObj
                }
            }
        },
        include: {
            profile: true
        }
    })
    return res.json({data: user});
}


// update profile==============================
const updateProfile = async(req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age, pictureUrl} = req.body;
    
    const profileInfo = {
        firstName, 
        lastName,
        age,
        pictureUrl
    };
    

    const profile = await prisma.profile.update({
        where: {
            id: parseInt(id)
        },
        data: {
            ...profileInfo
        }
    })
    return res.json({data: profile});
}

// delete user with its comments and posts====================
const deleteUser = async(req, res) => {
    const { userId } = req.params;
   
    const user = await prisma.user.delete({
        where: {
            id: parseInt(userId)
        },
        include: {
            profile: true,
            posts: true,
            comments: true
        }
    })
    console.log({data: user});
    return res.json({data: user})
}

module.exports = {
    createUser,
    updateUser,
    updateProfile,
    deleteUser
}