const CategoryController = require('../controllers/CategoryController')
const express = require('express');
const router = express.Router();

router.post("/create-category", CategoryController.create)
router.get("/get-category", CategoryController.getCategory)
router.delete("/delete-category/:id", CategoryController.deleteCategory)
router.put("/update-category/:id", CategoryController.updateCategory)

module.exports = router