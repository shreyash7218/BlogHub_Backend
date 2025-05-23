const { Category } = require('../models');
const { validationResult } = require('express-validator');

//all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['name', 'ASC']]
    });
    
    res.json(categories);
  } catch (error) {
    console.error('Get all categories error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }
    
    res.json(category);
  } catch (error) {
    console.error('Get category by ID error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//new category
exports.createCategory = async (req, res) => {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Validation error', 
      errors: errors.array() 
    });
  }
  
  try {
    const { name, description } = req.body;
    
    // Check if already exists
    const existingCategory = await Category.findOne({ where: { name } });
    
    if (existingCategory) {
      return res.status(400).json({ 
        success: false, 
        message: 'Category with this name already exists' 
      });
    }
    
    // Create category
    const category = await Category.create({
      name,
      description
    });
    
    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error creating category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Validation error', 
      errors: errors.array() 
    });
  }
  
  try {
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }
    
    const { name, description } = req.body;
    
    // Duplicate Check
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ where: { name } });
      
      if (existingCategory) {
        return res.status(400).json({ 
          success: false, 
          message: 'Category with this name already exists' 
        });
      }
    }
    
    // Update category
    await category.update({
      name: name || category.name,
      description: description !== undefined ? description : category.description
    });
    
    res.json(category);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }
    
    // Delete category
    await category.destroy();
    
    res.json({ 
      success: true, 
      message: 'Category deleted successfully' 
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error deleting category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};