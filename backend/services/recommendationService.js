const fs = require('fs');
const path = require('path');

// Helper to remove accents for fuzzy matching
function removeVietnameseTones(str) {
  if (!str) return '';
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  str = str.replace(/\u02C6|\u0306|\u031B/g, '');
  return str.trim();
}

// Load databases
function loadData() {
  const dishesPath = path.join(__dirname, '../data/dishes.json');
  const ingredientsPath = path.join(__dirname, '../data/ingredients.json');
  const storesPath = path.join(__dirname, '../data/stores.json');

  const dishes = JSON.parse(fs.readFileSync(dishesPath, 'utf8'));
  const ingredients = JSON.parse(fs.readFileSync(ingredientsPath, 'utf8'));
  const stores = JSON.parse(fs.readFileSync(storesPath, 'utf8'));

  return { dishes, ingredients, stores };
}

// Save dishes database
function saveDishes(dishes) {
  const dishesPath = path.join(__dirname, '../data/dishes.json');
  fs.writeFileSync(dishesPath, JSON.stringify(dishes, null, 2), 'utf8');
}

// Check if an ingredient matches user's inventory
function isIngredientAvailable(dishIng, userInventoryList, ingredientsDb) {
  const dishIngNameClean = removeVietnameseTones(dishIng.name);
  const dishIngId = dishIng.ingredientId ? dishIng.ingredientId.toLowerCase() : '';

  // Look up master ingredient info for aliases
  const masterIng = ingredientsDb.find(ing => ing.id === dishIng.ingredientId);
  const aliases = masterIng ? masterIng.aliases.map(a => removeVietnameseTones(a)) : [];

  for (const userItem of userInventoryList) {
    const userItemClean = removeVietnameseTones(userItem);
    if (!userItemClean) continue;

    // Direct substring or equal match
    if (dishIngNameClean.includes(userItemClean) || userItemClean.includes(dishIngNameClean)) {
      return true;
    }

    // Check by ID
    if (dishIngId && userItemClean.includes(dishIngId.replace(/_/g, ' '))) {
      return true;
    }

    // Check against aliases
    for (const alias of aliases) {
      if (alias.includes(userItemClean) || userItemClean.includes(alias)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Core Recommendation Engine
 */
function recommendDishes({
  budget = 100000,
  servings = 2,
  userIngredients = [],
  mealType = 'all',
  maxCookTime = null,
  category = 'all',
  sortBy = 'match',
  strictBudget = false
}) {
  const { dishes, ingredients: ingredientsDb } = loadData();

  const servingsMultiplier = Math.max(0.5, servings / 2);
  const cleanUserIngredients = (Array.isArray(userIngredients) ? userIngredients : [userIngredients])
    .filter(Boolean)
    .map(i => i.trim());

  const results = dishes.map(dish => {
    // Scale total price
    const scaledTotalCost = Math.round(dish.basePrice * servingsMultiplier / 1000) * 1000;
    let missingCost = 0;
    let availableCost = 0;

    const analyzedIngredients = dish.ingredients.map(ing => {
      const isAvailable = cleanUserIngredients.length > 0 &&
        isIngredientAvailable(ing, cleanUserIngredients, ingredientsDb);
      
      const scaledPrice = Math.round(ing.estimatedPrice * servingsMultiplier / 500) * 500;

      if (isAvailable) {
        availableCost += scaledPrice;
      } else {
        missingCost += scaledPrice;
      }

      return {
        ...ing,
        scaledPrice,
        isAvailable
      };
    });

    const totalIngCount = analyzedIngredients.length;
    const availableCount = analyzedIngredients.filter(i => i.isAvailable).length;
    const essentialCount = analyzedIngredients.filter(i => i.isEssential).length;
    const availableEssentialCount = analyzedIngredients.filter(i => i.isEssential && i.isAvailable).length;

    // Calculate match percentage
    let matchScore = 0;
    if (cleanUserIngredients.length === 0) {
      // If user provided no ingredients, match score depends on budget fit
      matchScore = scaledTotalCost <= budget ? 85 : Math.max(20, Math.round((budget / scaledTotalCost) * 75));
    } else {
      // Weight essentials much higher than optional items or basic salt/sauce
      const essentialWeight = essentialCount > 0 ? (availableEssentialCount / essentialCount) * 60 : 30;
      const totalRatioWeight = totalIngCount > 0 ? (availableCount / totalIngCount) * 30 : 0;
      const budgetBonus = (missingCost <= budget) ? 10 : 0;
      
      // If all essential main ingredients are available, guarantee high match >= 85%
      if (essentialCount > 0 && availableEssentialCount === essentialCount) {
        matchScore = Math.min(100, Math.max(88, Math.round(essentialWeight + totalRatioWeight + budgetBonus)));
      } else {
        matchScore = Math.min(100, Math.max(15, Math.round(essentialWeight + totalRatioWeight + budgetBonus)));
      }
    }

    // Remaining budget after buying missing ingredients
    const remainingBudget = budget - missingCost;
    const isWithinBudget = missingCost <= budget;

    return {
      ...dish,
      scaledTotalCost,
      missingCost,
      availableCost,
      remainingBudget,
      isWithinBudget,
      matchScore,
      availableCount,
      totalIngCount,
      servings,
      analyzedIngredients
    };
  });

  // Filtering
  let filtered = results.filter(dish => {
    // Budget filter
    if (strictBudget && !dish.isWithinBudget) {
      return false;
    }

    // Meal type
    if (mealType && mealType !== 'all') {
      if (!dish.mealType.includes(mealType)) return false;
    }

    // Category
    if (category && category !== 'all') {
      if (dish.category !== category) return false;
    }

    // Cook time
    if (maxCookTime && Number(maxCookTime) > 0) {
      if (dish.cookTime > Number(maxCookTime)) return false;
    }

    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'match':
        if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
        return a.missingCost - b.missingCost;
      case 'cheapest_missing':
        return a.missingCost - b.missingCost;
      case 'cheapest_total':
        return a.scaledTotalCost - b.scaledTotalCost;
      case 'fastest':
        return a.cookTime - b.cookTime;
      case 'calories':
        return a.calories - b.calories;
      default:
        return b.matchScore - a.matchScore;
    }
  });

  return {
    query: {
      budget,
      servings,
      userIngredients: cleanUserIngredients,
      mealType,
      maxCookTime,
      category,
      sortBy
    },
    totalMatches: filtered.length,
    dishes: filtered
  };
}

/**
 * Combo Meal Planner: Generates balanced multi-course tray (Mâm cơm)
 */
function suggestCombo({ budget = 80000, servings = 2, userIngredients = [] }) {
  const { dishes } = loadData();
  const cleanUser = userIngredients.map(i => removeVietnameseTones(i));

  const savoryDishes = dishes.filter(d => d.category === 'Món mặn');
  const soupDishes = dishes.filter(d => d.category === 'Món canh');
  const veggieDishes = dishes.filter(d => d.category === 'Món xào/rau');

  const combos = [];

  // Generate 2-dish or 3-dish combos
  for (const savory of savoryDishes) {
    for (const soup of soupDishes) {
      // Calculate missing cost for this pair
      const mult = servings / 2;
      const pairTotal = (savory.basePrice + soup.basePrice) * mult;

      // Check ingredient overlap
      const pair = [savory, soup];
      let missingCost = 0;
      pair.forEach(d => {
        d.ingredients.forEach(ing => {
          const ingClean = removeVietnameseTones(ing.name);
          const has = cleanUser.some(u => ingClean.includes(u) || u.includes(ingClean));
          if (!has) {
            missingCost += ing.estimatedPrice * mult;
          }
        });
      });

      if (missingCost <= budget * 1.15) {
        combos.push({
          title: `Mâm cơm Ấm Cúng: ${savory.name} & ${soup.name}`,
          type: '2 món cơ bản (Mặn + Canh)',
          dishes: pair,
          totalPrice: Math.round(pairTotal / 1000) * 1000,
          missingCost: Math.round(missingCost / 1000) * 1000,
          isWithinBudget: missingCost <= budget,
          remainingBudget: budget - missingCost,
          savings: Math.max(0, budget - missingCost)
        });
      }

      // Check 3-dish combo if budget allows
      for (const veg of veggieDishes) {
        const trioTotal = (savory.basePrice + soup.basePrice + veg.basePrice) * mult;
        let trioMissing = missingCost;
        veg.ingredients.forEach(ing => {
          const ingClean = removeVietnameseTones(ing.name);
          const has = cleanUser.some(u => ingClean.includes(u) || u.includes(ingClean));
          if (!has) {
            trioMissing += ing.estimatedPrice * mult;
          }
        });

        if (trioMissing <= budget * 1.1) {
          combos.push({
            title: `Mâm cơm Hoàn Chỉnh: ${savory.name} + ${soup.name} + ${veg.name}`,
            type: '3 món chuẩn vị (Mặn + Canh + Rau)',
            dishes: [savory, soup, veg],
            totalPrice: Math.round(trioTotal / 1000) * 1000,
            missingCost: Math.round(trioMissing / 1000) * 1000,
            isWithinBudget: trioMissing <= budget,
            remainingBudget: budget - trioMissing,
            savings: Math.max(0, budget - trioMissing)
          });
        }
      }
    }
  }

  combos.sort((a, b) => b.isWithinBudget - a.isWithinBudget || a.missingCost - b.missingCost);

  return combos.slice(0, 6);
}

/**
 * 7-Day Weekly Meal Planner Engine
 */
function generateWeeklyMealPlan({ weeklyBudget = 500000, servings = 2, dietGoal = 'balanced' }) {
  const { dishes } = loadData();
  const mult = servings / 2;

  // Filter or prioritize based on diet goal
  let availableDishes = [...dishes];
  if (dietGoal === 'gym') {
    availableDishes.sort((a, b) => (b.calories || 300) - (a.calories || 300));
  } else if (dietGoal === 'clean') {
    availableDishes = dishes.filter(d => d.tags.includes('Healthy') || d.tags.includes('Thanh mát') || d.category === 'Món canh' || d.category === 'Món xào/rau');
    if (availableDishes.length < 10) availableDishes = [...dishes];
  } else if (dietGoal === 'saving') {
    availableDishes.sort((a, b) => a.basePrice - b.basePrice);
  }

  const daysOfWeek = [
    { day: 'Thứ 2', title: 'Khởi đầu nhẹ nhàng' },
    { day: 'Thứ 3', title: 'Nạp năng lượng' },
    { day: 'Thứ 4', title: 'Cân bằng thanh đạm' },
    { day: 'Thứ 5', title: 'Đậm đà đưa cơm' },
    { day: 'Thứ 6', title: 'Gọn lẹ cuối tuần' },
    { day: 'Thứ 7', title: 'Mâm cơm sum vầy' },
    { day: 'Chủ Nhật', title: 'Thịnh soạn thư thả' }
  ];

  const plan = [];
  let totalSpent = 0;
  const shoppingAggregator = {};

  const savoryList = availableDishes.filter(d => d.category === 'Món mặn');
  const soupList = availableDishes.filter(d => d.category === 'Món canh' || d.category === 'Món xào/rau');

  daysOfWeek.forEach((d, idx) => {
    // Pick 1 main and 1 side/soup with rotation
    const mainDish = savoryList[idx % savoryList.length] || dishes[0];
    const sideDish = soupList[(idx * 2) % soupList.length] || dishes[1];

    const mainCost = Math.round(mainDish.basePrice * mult / 1000) * 1000;
    const sideCost = Math.round(sideDish.basePrice * mult / 1000) * 1000;
    const dayTotal = mainCost + sideCost;
    totalSpent += dayTotal;

    // Aggregate shopping list
    [mainDish, sideDish].forEach(dish => {
      dish.ingredients.forEach(ing => {
        if (!shoppingAggregator[ing.name]) {
          shoppingAggregator[ing.name] = {
            name: ing.name,
            amount: ing.amount,
            estimatedPrice: Math.round(ing.estimatedPrice * mult / 500) * 500,
            count: 1
          };
        } else {
          shoppingAggregator[ing.name].count += 1;
          shoppingAggregator[ing.name].estimatedPrice += Math.round(ing.estimatedPrice * mult / 500) * 500;
        }
      });
    });

    plan.push({
      day: d.day,
      theme: d.title,
      dishes: [
        { ...mainDish, scaledPrice: mainCost, role: 'Món chính' },
        { ...sideDish, scaledPrice: sideCost, role: 'Món phụ / Canh' }
      ],
      dayCost: dayTotal,
      calories: (mainDish.calories || 300) + (sideDish.calories || 150)
    });
  });

  const consolidatedShoppingList = Object.values(shoppingAggregator);

  return {
    weeklyBudget,
    totalSpent,
    remainingSavings: Math.max(0, weeklyBudget - totalSpent),
    servings,
    dietGoal,
    days: plan,
    shoppingList: consolidatedShoppingList
  };
}

/**
 * AI Chef Conversational Assistant Engine
 */
function handleChefAIQuery({ message = '', userIngredients = [] }) {
  const { dishes } = loadData();
  const q = removeVietnameseTones(message);

  let reply = '';
  let recommendedDish = null;

  // Check intent
  if (q.includes('chao') || q.includes('hello') || q.includes('giup')) {
    reply = 'Xin chào bạn! Mình là Bếp Trưởng AI 👨‍🍳. Bạn đang băn khoăn hôm nay ăn gì, có nguyên liệu nào chưa biết nấu, hay cần mẹo nấu ăn ngon cứ hỏi mình nhé!';
  } else if (q.includes('trung') && (q.includes('ca chua') || q.includes('dau'))) {
    recommendedDish = dishes.find(d => d.id === 'dau_sot_ca_chua') || dishes.find(d => d.id === 'canh_ca_chua_trung');
    reply = 'Với trứng và cà chua (hoặc đậu hũ), bạn có thể nấu ngay "Đậu hũ sốt cà chua" hoặc "Canh mây cà chua trứng gà". Vừa thanh mát, chua dịu lại nấu xong chỉ trong 10-15 phút!';
  } else if (q.includes('thit') && q.includes('kho')) {
    recommendedDish = dishes.find(d => d.id === 'thit_kho_tau_trung_cut');
    reply = 'Nếu có thịt heo, món Thịt kho tàu trứng cút nước dừa là chân ái! Mẹo nhỏ: Luộc chần thịt trước và thắng nước màu cánh gián vừa tới thì nước kho sẽ óng ánh đậm đà!';
  } else if (q.includes('nhanh') || q.includes('muon') || q.includes('met') || q.includes('10 phut') || q.includes('15 phut')) {
    recommendedDish = dishes.find(d => d.id === 'trung_chien_thit_bam') || dishes.find(d => d.id === 'mi_xao_trung_rau_cai');
    reply = 'Muốn bữa ăn siêu tốc dưới 15 phút mà vẫn ngon miệng và đủ đạm? Hãy làm Trứng chiên thịt băm hành lá hoặc Rau muống xào tỏi xanh giòn nhé!';
  } else if (q.includes('tiet kiem') || q.includes('sinh vien') || q.includes('it tien') || q.includes('20k') || q.includes('30k')) {
    recommendedDish = dishes.find(d => d.id === 'rau_muong_xao_toi') || dishes.find(d => d.id === 'dau_sot_ca_chua');
    reply = 'Ngân sách hạt dẻ cho sinh viên thì Rau muống xào tỏi (12k) hoặc Đậu sốt cà chua (22k) vừa rẻ vừa no bụng. Nhớ mua đồ ở chợ truyền thống theo lạng để tiết kiệm 30% nhé!';
  } else if (q.includes('tanh') || q.includes('ca') || q.includes('meo')) {
    reply = '💡 Mẹo khử mùi tanh cá: Rửa cá với nước muối loãng pha chút giấm hoặc chanh. Khi kho hoặc nấu canh, luôn đợi nước sôi bùng mới thả cá vào, không đậy vung kín để mùi tanh bay hơi tự nhiên!';
  } else {
    // Fuzzy search a dish in database
    const match = dishes.find(d => q.includes(removeVietnameseTones(d.name)) || d.ingredients.some(i => q.includes(removeVietnameseTones(i.name))));
    if (match) {
      recommendedDish = match;
      reply = `Theo nguyên liệu bạn hỏi, mình gợi ý món "${match.name}". Món này nấu mất khoảng ${match.cookTime} phút, chi phí ước tính khoảng ${match.basePrice.toLocaleString()}đ cho 2 người!`;
    } else {
      recommendedDish = dishes[0];
      reply = 'Bếp Trưởng AI đã tiếp nhận câu hỏi của bạn! Bạn có thể thử kết hợp các món trong ngân sách hôm nay hoặc bấm xem công thức gợi ý bên dưới nhé!';
    }
  }

  return {
    reply,
    recommendedDish: recommendedDish ? {
      id: recommendedDish.id,
      name: recommendedDish.name,
      basePrice: recommendedDish.basePrice,
      cookTime: recommendedDish.cookTime,
      image: recommendedDish.image,
      category: recommendedDish.category
    } : null
  };
}

module.exports = {
  loadData,
  saveDishes,
  recommendDishes,
  suggestCombo,
  generateWeeklyMealPlan,
  handleChefAIQuery
};

