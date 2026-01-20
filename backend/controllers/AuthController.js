const User = require("../models/User");
const createToken = require("../helper/createToken")

const AuthController = {
    register: async (req, res) => {
        try {
            const { name, email, password, phone, confirmPassword } = req.body;
            const UserInfo = await User.register(name, email, password, phone, confirmPassword);
            const token = createToken(UserInfo._id);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 5 * 24 * 60 * 60 * 1000,
            });

            const userResponse = {
                _id: UserInfo._id,
                name: UserInfo.name,
                email: UserInfo.email,
                phone: UserInfo.phone,
                password: UserInfo.password,
                role: UserInfo.role,
            };

            return res.status(200).json({
                success: true,
                msg: "Account created successfully",
                data: userResponse,
                token,
            });

        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const UserInfo = await User.login(email, password);

            const token = createToken(UserInfo._id);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
            });

            const userResponse = {
                _id: UserInfo._id,
                name: UserInfo.name,
                email: UserInfo.email,
                phone: UserInfo.phone,
                role: UserInfo.role,
            };

            return res.status(200).json({
                success: true,
                msg: "Logged in successfully",
                data: userResponse,
                token,
            });
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

}

module.exports = AuthController