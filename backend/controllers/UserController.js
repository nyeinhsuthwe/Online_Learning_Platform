const User = require("../models/User");
const bcrypt = require('bcrypt');
const sendEmail = require("../helper/sendEmail");
const crypto = require("crypto");

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

    changePassword: async (req, res) => {
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
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: "No account found with this email.",
                });
            }

            const resetToken = crypto.randomBytes(32).toString("hex");
            const hashedToken = crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");

            user.resetPasswordToken = hashedToken;
            user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
            await user.save();

            const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 15 minutes.</p>
      `,
            });

            res.status(200).json({
                success: true,
                message: "A reset link has been sent to your email.",
            });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { password } = req.body;

            const hashedToken = crypto
                .createHash("sha256")
                .update(req.params.token)
                .digest("hex");

            const user = await User.findOne({
                resetPasswordToken: hashedToken,
                resetPasswordExpire: { $gt: Date.now() },
            });

            if (!user) {
                return res.status(400).json({ error: "Invalid or expired token" });
            }

            user.password = await bcrypt.hash(password, 10);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            res.status(200).json({
                success: true,
                message: "Password reset successful",
            });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

}

module.exports = UserController;