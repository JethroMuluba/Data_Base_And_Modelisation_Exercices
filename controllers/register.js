const prisma = require('../db/prisma')

const userRegister = async (req, res) => {
    try {
        const creatUser = await prisma.user.create({
            data: {
                email : req.body.email,  
                password: req.body.password
            }
        });
        res.status(201).json(creatUser);
        console.log('User successfully Registered');
    } catch (error) {
        res.status(500);
        console.log(error);
    }
    }

module.exports = userRegister;