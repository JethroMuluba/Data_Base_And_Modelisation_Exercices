const bcrypt = require('bcrypt');
const prisma = require('../db/prisma');

const userRegister = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const creatUser = await prisma.user.create({
            data: {
                email : req.body.email,  
                password: hashedPassword
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