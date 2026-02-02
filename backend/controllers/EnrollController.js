const Enroll = require("../models/Enroll");
const Course = require("../models/Course");

const EnrollController = {
    createEnroll: async (req, res) => {
        try {
            const { course_id } = req.params;
            const user_id = req.user?.id;
            if (!user_id) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const { paymentMethod } = req.body;

            const course = await Course.findById(course_id);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }

            const exists = await Enroll.findOne({ user_id, course_id });
            if (exists) {
                return res.status(400).json({ message: "You are already enrolled in this course." });
            }

            const enroll = await Enroll.create({
                user_id,
                course_id,
                price: course.price,
                paymentMethod,
                paymentStatus: "pending",
            });

            return res.status(200).json({
                message: "User enrolled successfully",
                enroll,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getEnrollList: async (req, res) => {
        try {
            const data = await Enroll.find()
            return res.status(200).json({
                data
            })
        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    },

    getEnrollByUser: async (req, res) => {
        try {
            const user_id = req.user.id;

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 6;
            const skip = (page - 1) * limit;

            const [enrolls, total] = await Promise.all([
                Enroll.find({ user_id })
                    .populate("course_id", "title")
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 }),
                Enroll.countDocuments({ user_id }),
            ]);

            return res.status(200).json({
                data: enrolls,
                meta: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            });
        } catch (error) {
            return res.status(400).json({
                error: error.message,
            });
        }
    },



    confirmStatus: async (req, res) => {
        try {
            const { enroll_id, status } = req.body
            const enroll = await Enroll.findById(enroll_id);
            if (!enroll) {
                return res.status(404).json({
                    message: "Enrollment not found",
                });
            }
            if (enroll.paymentStatus === "paid") {
                return res.status(400).json({
                    message: "Payment already confirmed",
                });
            }
            enroll.paymentStatus = status;
            enroll.confirmedAt = new Date();
            await enroll.save()
            return res.status(200).json({
                message: `Payment ${status} successfully`,
                enroll,
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
};

module.exports = EnrollController;
