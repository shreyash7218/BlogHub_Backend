const { Post, User, Category } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

//format createdAt/updatedAt to ISO string
const formatPostDate = (post) => {
  const postJSON = post.toJSON();
  return {
    ...postJSON,
    created_at: post.createdAt?.toISOString(),
    updated_at: post.updatedAt?.toISOString()
  };
};

//all posts
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const posts = await Post.findAndCountAll({
      limit,
      offset,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profile_image']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });

    const totalPages = Math.ceil(posts.count / limit);

    res.json({
      posts: posts.rows.map(formatPostDate),
      pagination: {
        total: posts.count,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching posts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profile_image']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json(formatPostDate(post));
  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching post',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  try {
    const { title, content, category_id, featured_image } = req.body;

    const post = await Post.create({
      title,
      content,
      category_id,
      featured_image,
      user_id: req.user.id
    });

    const newPost = await Post.findByPk(post.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profile_image']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });

    res.status(201).json(formatPostDate(newPost));
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating post',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this post'
      });
    }

    const { title, content, category_id, featured_image } = req.body;

    await post.update({
      title,
      content,
      category_id,
      featured_image
    });

    const updatedPost = await Post.findByPk(post.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profile_image']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json(formatPostDate(updatedPost));
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating post',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (post.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this post'
      });
    }

    await post.destroy();

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting post',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// posts by user
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json(posts.map(formatPostDate));
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching user posts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get posts by category
exports.getPostsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const posts = await Post.findAndCountAll({
      where: { category_id: categoryId },
      limit,
      offset,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profile_image']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });

    const totalPages = Math.ceil(posts.count / limit);

    res.json({
      posts: posts.rows.map(formatPostDate),
      pagination: {
        total: posts.count,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error('Get posts by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching posts by category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Search posts
exports.searchPosts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } }
        ]
      },
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profile_image']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json(posts.map(formatPostDate));
  } catch (error) {
    console.error('Search posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error searching posts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};