const Category = require('../models/Category')

const CategoryController = {
    create: async (req, res) => {
        const { name } = req.body
        const data = await Category.create({
            name
        })
        return res.status(200).json({
            message: "Category created successfully",
            name: data
        })
    },
    getCategory: async (req, res) => {
        try {
            const data = await Category.find()
            return res.status(200).json({
                data
            })
        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params
            await Category.findByIdAndDelete(id)
            return res.status(200).json({
                msg: "deleted"
            })

        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body
            const data = await Category.findByIdAndUpdate(id,
                { name },
                { new: true }
            )

            return res.status(200).json({
                msg: "update",
                data
            })

        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

module.exports = CategoryController