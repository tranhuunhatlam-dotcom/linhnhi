const express = require('express');
const router = express.Router();
const {
  loadData,
  saveDishes,
  recommendDishes,
  suggestCombo,
  generateWeeklyMealPlan,
  handleChefAIQuery
} = require('../services/recommendationService');

// GET all dishes
router.get('/dishes', (req, res) => {
  try {
    const { dishes } = loadData();
    const { search, category } = req.query;

    let result = dishes;
    if (category && category !== 'all') {
      result = result.filter(d => d.category === category);
    }
    if (search) {
      const q = search.toLowerCase().trim();
      result = result.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.description.toLowerCase().includes(q) ||
        (d.tags && d.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    res.json({ success: true, count: result.length, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET dish by ID
router.get('/dishes/:id', (req, res) => {
  try {
    const { dishes } = loadData();
    const dish = dishes.find(d => d.id === req.params.id);
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy món ăn!' });
    }
    res.json({ success: true, data: dish });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST suggest dishes based on user criteria
router.post('/suggest', (req, res) => {
  try {
    const {
      budget = 100000,
      servings = 2,
      userIngredients = [],
      mealType = 'all',
      maxCookTime = null,
      category = 'all',
      sortBy = 'match',
      strictBudget = false
    } = req.body;

    const parsedBudget = Number(budget) || 100000;
    const parsedServings = Number(servings) || 2;

    const result = recommendDishes({
      budget: parsedBudget,
      servings: parsedServings,
      userIngredients,
      mealType,
      maxCookTime,
      category,
      sortBy,
      strictBudget
    });

    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST suggest combo mâm cơm
router.post('/combo', (req, res) => {
  try {
    const {
      budget = 80000,
      servings = 2,
      userIngredients = []
    } = req.body;

    const combos = suggestCombo({
      budget: Number(budget) || 80000,
      servings: Number(servings) || 2,
      userIngredients
    });

    res.json({ success: true, count: combos.length, data: combos });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST 7-day weekly meal plan generator
router.post('/weekly-plan', (req, res) => {
  try {
    const { weeklyBudget = 500000, servings = 2, dietGoal = 'balanced' } = req.body;
    const plan = generateWeeklyMealPlan({
      weeklyBudget: Number(weeklyBudget) || 500000,
      servings: Number(servings) || 2,
      dietGoal
    });
    res.json({ success: true, data: plan });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST AI Chef assistant conversational endpoint
router.post('/ai-chef', (req, res) => {
  try {
    const { message = '', userIngredients = [] } = req.body;
    const result = handleChefAIQuery({ message, userIngredients });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET master ingredients list for auto-complete and tag picker
router.get('/ingredients', (req, res) => {
  try {
    const { ingredients } = loadData();
    res.json({ success: true, count: ingredients.length, data: ingredients });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET stores & shopping places
router.get('/stores', (req, res) => {
  try {
    const { stores } = loadData();
    res.json({ success: true, count: stores.length, data: stores });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST add new dish
router.post('/dishes', (req, res) => {
  try {
    const { name, category, cookTime, difficulty, basePrice, description, ingredients, steps, tags, image } = req.body;
    if (!name || !ingredients || !steps) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc (Tên món, Nguyên liệu, Cách làm)' });
    }

    const { dishes } = loadData();
    const newId = 'custom_' + Date.now();
    const newDish = {
      id: newId,
      name,
      category: category || 'Món mặn',
      mealType: ['Bữa trưa', 'Bữa tối'],
      cookTime: Number(cookTime) || 20,
      difficulty: difficulty || 'Dễ',
      baseServings: 2,
      basePrice: Number(basePrice) || 35000,
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80',
      description: description || 'Món ăn tự thêm bởi người dùng',
      calories: 300,
      tags: tags || ['Tự nấu', 'Cơm nhà'],
      ingredients: ingredients || [],
      steps: steps || []
    };

    dishes.unshift(newDish);
    saveDishes(dishes);

    res.status(201).json({ success: true, data: newDish });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET stats overview
router.get('/stats', (req, res) => {
  try {
    const { dishes, ingredients } = loadData();
    const prices = dishes.map(d => d.basePrice);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

    res.json({
      success: true,
      stats: {
        totalDishes: dishes.length,
        totalIngredients: ingredients.length,
        minPrice,
        maxPrice,
        avgPrice
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
