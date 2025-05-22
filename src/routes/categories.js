const express = require('express');
const { body } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get category by ID
router.get('/:id', categoryController.getCategoryById);

// Create a new category with validation
router.post(
  '/',
  authenticate,
  [
    body('name')
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('description')
      .optional()
  ],
  categoryController.createCategory
);

// Update a category with validation
router.put(
  '/:id',
  authenticate,
  [
    body('name')
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('description')
      .optional()
  ],
  categoryController.updateCategory
);

// Delete a category
router.delete('/:id', authenticate, categoryController.deleteCategory);

module.exports = router;