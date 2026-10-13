/**
 * API Client for Smart Kitchen Recommender
 * Supports dual-mode: Real Node.js Express REST API + Automatic Client Engine Fallback
 */

const API = {
  // Determine backend URL
  baseUrl: (window.location.protocol === 'file:' || !window.location.port)
    ? 'http://localhost:3000/api'
    : '/api',

  isBackendConnected: false,

  // Check backend server status
  async checkHealth() {
    try {
      const res = await fetch(`${this.baseUrl}/stats`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        this.isBackendConnected = true;
        return { online: true, data: await res.json() };
      }
    } catch (e) {
      this.isBackendConnected = false;
    }
    return { online: false };
  },

  // Fetch all dishes or search
  async getDishes(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${this.baseUrl}/dishes?${query}`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Backend offline, using fallback dishes data');
    }
    return { success: true, count: FALLBACK_DATA.dishes.length, data: FALLBACK_DATA.dishes };
  },

  // Fetch single dish detail
  async getDishById(id) {
    try {
      const res = await fetch(`${this.baseUrl}/dishes/${id}`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Backend offline, using fallback dish detail');
    }
    const found = FALLBACK_DATA.dishes.find(d => d.id === id);
    return { success: !!found, data: found };
  },

  // Suggest dishes with budget & fridge ingredients
  async getSuggestions(criteria) {
    try {
      const res = await fetch(`${this.baseUrl}/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(criteria),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        this.isBackendConnected = true;
        return await res.json();
      }
    } catch (err) {
      console.warn('Backend request failed, executing client-side recommendation engine:', err);
      this.isBackendConnected = false;
    }

    // Client-side execution fallback
    return this.clientSideRecommend(criteria);
  },

  // Generate combo trays (Mâm cơm)
  async getCombos(criteria) {
    try {
      const res = await fetch(`${this.baseUrl}/combo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(criteria),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Backend combo request failed, fallbacking:', err);
    }

    return this.clientSideCombos(criteria);
  },

  // Master ingredients
  async getIngredients() {
    try {
      const res = await fetch(`${this.baseUrl}/ingredients`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Backend offline, fallback ingredients');
    }
    return { success: true, data: [] };
  },

  // Store information & tips
  async getStores() {
    try {
      const res = await fetch(`${this.baseUrl}/stores`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Backend offline, fallback stores');
    }
    return { success: true, count: FALLBACK_DATA.stores.length, data: FALLBACK_DATA.stores };
  },

  // 7-day Weekly meal planner
  async getWeeklyPlan(options = {}) {
    try {
      const res = await fetch(`${this.baseUrl}/weekly-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Weekly plan backend error, generating fallback');
    }
    return {
      success: true,
      data: {
        weeklyBudget: options.weeklyBudget || 500000,
        totalSpent: 420000,
        remainingSavings: 80000,
        days: [
          { day: 'Thứ 2', theme: 'Khởi đầu nhẹ nhàng', dayCost: 40000, dishes: [FALLBACK_DATA.dishes[0], FALLBACK_DATA.dishes[3]] },
          { day: 'Thứ 3', theme: 'Nạp năng lượng', dayCost: 55000, dishes: [FALLBACK_DATA.dishes[1], FALLBACK_DATA.dishes[4]] },
          { day: 'Thứ 4', theme: 'Cân bằng thanh đạm', dayCost: 48000, dishes: [FALLBACK_DATA.dishes[5], FALLBACK_DATA.dishes[3]] },
          { day: 'Thứ 5', theme: 'Đậm đà đưa cơm', dayCost: 65000, dishes: [FALLBACK_DATA.dishes[2], FALLBACK_DATA.dishes[4]] },
          { day: 'Thứ 6', theme: 'Gọn lẹ cuối tuần', dayCost: 38000, dishes: [FALLBACK_DATA.dishes[1], FALLBACK_DATA.dishes[0]] },
          { day: 'Thứ 7', theme: 'Mâm cơm sum vầy', dayCost: 75000, dishes: [FALLBACK_DATA.dishes[2], FALLBACK_DATA.dishes[3]] },
          { day: 'Chủ Nhật', theme: 'Thịnh soạn thư thả', dayCost: 80000, dishes: [FALLBACK_DATA.dishes[5], FALLBACK_DATA.dishes[4]] }
        ]
      }
    };
  },

  // Conversational AI Chef
  async askChefAI(message, userIngredients = []) {
    try {
      const res = await fetch(`${this.baseUrl}/ai-chef`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, userIngredients })
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('AI Chef backend error, generating local reply');
    }
    return {
      success: true,
      reply: 'Bếp Trưởng AI xin chào! Với các nguyên liệu của bạn, món Đậu hũ sốt cà chua hoặc Canh mây cà chua trứng gà rất phù hợp, nấu nhanh dưới 15 phút!',
      recommendedDish: FALLBACK_DATA.dishes[0]
    };
  },

  // Add custom dish
  async addDish(dishData) {
    try {
      const res = await fetch(`${this.baseUrl}/dishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dishData)
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('Backend offline, storing in local fallback');
    }
    dishData.id = 'local_' + Date.now();
    FALLBACK_DATA.dishes.unshift(dishData);
    return { success: true, data: dishData };
  },

  // Client-side recommendation algorithm for 100% offline reliability
  clientSideRecommend({ budget = 50000, servings = 2, userIngredients = [], category = 'all', maxCookTime = 0, sortBy = 'match', strictBudget = false }) {
    const multiplier = servings / 2;
    const cleanUser = userIngredients.map(i => i.toLowerCase().trim());

    const processed = FALLBACK_DATA.dishes.map(dish => {
      const scaledTotalCost = Math.round(dish.basePrice * multiplier / 1000) * 1000;
      let missingCost = 0;
      let availableCost = 0;

      const analyzedIngredients = dish.ingredients.map(ing => {
        const ingNameLower = ing.name.toLowerCase();
        const isAvailable = cleanUser.some(u => u && (ingNameLower.includes(u) || u.includes(ingNameLower)));
        const scaledPrice = Math.round(ing.estimatedPrice * multiplier / 500) * 500;

        if (isAvailable) {
          availableCost += scaledPrice;
        } else {
          missingCost += scaledPrice;
        }

        return { ...ing, scaledPrice, isAvailable };
      });

      const totalIngCount = analyzedIngredients.length;
      const availableCount = analyzedIngredients.filter(i => i.isAvailable).length;
      const matchScore = totalIngCount > 0 ? Math.round((availableCount / totalIngCount) * 100) : 80;

      return {
        ...dish,
        scaledTotalCost,
        missingCost,
        availableCost,
        remainingBudget: budget - missingCost,
        isWithinBudget: missingCost <= budget,
        matchScore: cleanUser.length === 0 ? (scaledTotalCost <= budget ? 85 : 50) : Math.max(25, matchScore),
        availableCount,
        totalIngCount,
        servings,
        analyzedIngredients
      };
    });

    let filtered = processed.filter(d => {
      if (strictBudget && !d.isWithinBudget) return false;
      if (category !== 'all' && d.category !== category) return false;
      if (maxCookTime > 0 && d.cookTime > maxCookTime) return false;
      return true;
    });

    if (sortBy === 'cheapest_missing') filtered.sort((a, b) => a.missingCost - b.missingCost);
    else if (sortBy === 'cheapest_total') filtered.sort((a, b) => a.scaledTotalCost - b.scaledTotalCost);
    else if (sortBy === 'fastest') filtered.sort((a, b) => a.cookTime - b.cookTime);
    else filtered.sort((a, b) => b.matchScore - a.matchScore);

    return { success: true, totalMatches: filtered.length, dishes: filtered };
  },

  clientSideCombos({ budget = 80000, servings = 2, userIngredients = [] }) {
    const mult = servings / 2;
    const cleanUser = userIngredients.map(i => i.toLowerCase().trim());
    const savory = FALLBACK_DATA.dishes.filter(d => d.category === 'Món mặn');
    const soup = FALLBACK_DATA.dishes.filter(d => d.category === 'Món canh');

    const combos = [];
    savory.forEach(s => {
      soup.forEach(c => {
        const total = (s.basePrice + c.basePrice) * mult;
        let missing = 0;
        [...s.ingredients, ...c.ingredients].forEach(ing => {
          const ingName = ing.name.toLowerCase();
          const has = cleanUser.some(u => u && ingName.includes(u));
          if (!has) missing += ing.estimatedPrice * mult;
        });

        if (missing <= budget * 1.2) {
          combos.push({
            title: `Mâm cơm Ấm Cúng: ${s.name} & ${c.name}`,
            type: '2 món cơ bản (Mặn + Canh)',
            dishes: [s, c],
            totalPrice: Math.round(total / 1000) * 1000,
            missingCost: Math.round(missing / 1000) * 1000,
            isWithinBudget: missing <= budget,
            remainingBudget: budget - missing
          });
        }
      });
    });

    return { success: true, count: combos.length, data: combos.slice(0, 4) };
  }
};
