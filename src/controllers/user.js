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

module.exports = {
    createUser
}