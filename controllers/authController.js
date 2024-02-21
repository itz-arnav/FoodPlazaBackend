import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_TOKEN = process.env.JWT_TOKEN

export const registerUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        const user = new User({
            username,
            password,
            email,
        });

        const findUser = await User.findOne({ username });
        if (findUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_TOKEN, {
            expiresIn: '30d',
        });

        res.status(201).send({ message: 'User registered successfully', token });
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found")
            return res.status(400).send({ message: 'Invalid Username credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            console.log("Password mismatch")
            return res.status(400).send({ message: 'Invalid Password credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_TOKEN, {
            expiresIn: '30d',
        });
        
        res.status(200).send({ message: 'Logged in successfully', token });
    } catch (err) {
        next(err);
    }
};

