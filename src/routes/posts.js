const express = require('express');
const { body } = require('express-validator');
const postController = require('../controllers/postController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get all posts
router.get('/', postController.getAllPosts);

// Search posts
router.get('/search', postController.searchPosts);

// Create a new post with validation
router.post(
  '/',
  authenticate,
  [
    body('title')
      .isLength({ min: 3, max: 255 })
      .withMessage('Title must be between 3 and 255 characters'),
    body('content')
      .notEmpty()
      .withMessage('Content is required'),
    body('category_id')
      .optional()
      .isInt()
      .withMessage('Category ID must be an integer'),
    body('featured_image')
      .optional()
      .isURL()
      .withMessage('Featured image must be a valid URL')
  ],
  postController.createPost
);

// Update a post with validation
router.put(
  '/:id',
  authenticate,
  [
    body('title')
      .isLength({ min: 3, max: 255 })
      .withMessage('Title must be between 3 and 255 characters'),
    body('content')
      .notEmpty()
      .withMessage('Content is required'),
    body('category_id')
      .optional()
      .isInt()
      .withMessage('Category ID must be an integer'),
    body('featured_image')
      .optional()
      .isURL()
      .withMessage('Featured image must be a valid URL')
  ],
  postController.updatePost
);

// Delete a post
router.delete('/:id', authenticate, postController.deletePost);

// Get posts by user
router.get('/user', authenticate, postController.getUserPosts);

// Get posts by category
router.get('/category/:categoryId', postController.getPostsByCategory);

// Get post by ID
router.get('/:id', postController.getPostById);

module.exports = router;