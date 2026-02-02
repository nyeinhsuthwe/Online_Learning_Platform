const User = require("../models/User");
const bcrypt = require('bcrypt');

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().select("-password");
            return res.status(200).json({
                success: true,
                data: users,
            });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    },


    deleteUser: async (req, res) => {
        try {
            const deleteUser = await User.findByIdAndDelete(req.params._id);
            return res.status(200).json({
                success: true,
                data: deleteUser
            })
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { name, email, phone, bio, avatar } = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { name, email, phone, bio, avatar },
                { new: true }
            ).select("-password");

            return res.status(200).json({
                success: true,
                data: updatedUser
            });

        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    },

    changePassword : async (req, res) => {
        try {
            const { currentPassword, newPassword, confirmPassword } = req.body;

            if (!currentPassword || !newPassword || !confirmPassword) {
                return res.status(400).json({ error: "All password fields are required" });
            }

            if (newPassword !== confirmPassword) {
                return res.status(400).json({ error: "New password and confirm password do not match" });
            }

            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ error: "User not found" });

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            return res.status(200).json({ success: true, msg: "Password updated successfully" });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

}

module.exports = UserController;