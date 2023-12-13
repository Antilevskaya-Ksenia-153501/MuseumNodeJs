import User from "../models/User.js"
import bcrypt from 'bcryptjs';
//SignUp
export const register = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;
        const isUsed = User.findOne({ email });

        if (isUsed){
            return res.status(409).json({
                message: "This email is already taken."
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        newUser = new User({
            fullName, 
            email, 
            password: hash,
        });

        await newUser.save();

        res.json({message: "Registration completed successfully"});

    } catch (error) {
        res.json({message: "Error during registration."});
    }
}
//SignIn
export const signin = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;
        const user = User.findOne({ email });

        if (!user){
            return res.json({
                message: "There is no such user."
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect){
            return res.json({
                message: "Incorrect password."
            })
        }
        
    } catch (error) {
        res.json({message: "Error during authorization."});
    }
}