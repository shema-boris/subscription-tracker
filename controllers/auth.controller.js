import mongoose from 'mongoose';
import bcrypt from 'bcrypt js'
import jwt from 'jsonwebtoken';
export const signUp =async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name, email, password} = req.body;

        //Check if a user already exists
        const existingUser = await User.findOne({email});

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode=409;
            throw error;
        }

        // Hash password

        const salt = await bcrypt.gensalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await user.create([{name, email, password: hashedPassword}], {session});

        const token = jwt.sign({userId: newUsers[0].id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0],
            }
        })
    } catch (error) {
        await session.abortTransaction();
         session.endSession();
        next(error);
    }
}

export const signIn = async(req, res, next) => {}

export const signOut = async(req, res, next) => {}
