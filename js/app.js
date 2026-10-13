/**
 * Smart Kitchen Food Recommender - Main Application Logic
 */

// Application State
const State = {
  budget: 50000,
  servings: 2,
  hasSpices: true,
  userIngredients: ['Trứng gà', 'Cà chua'],
  category: 'all',
  maxCookTime: 0,
  sortBy: 'match',
  strictBudget: false,
  activeTab: 'dishes', // 'dishes' | 'combos' | 'stores'
  currentDishes: [],
  currentCombos: [],
  storesData: []
};

// Utilities
function formatCurrency(amount) {
  if (amount === undefined || amount === null) return '0 đ';
  return new Intl.NumberFormat('vi-VN').format(Math.round(amount)) + ' đ';
}

function showToast(message) {
  const toast = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');
  toastText.textContent = message;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// DOM Elements
const Elements = {
  budgetInput: document.getElementById('budget-range'),
  budgetDisplay: document.getElementById('budget-value-display'),
  quickPills: document.querySelectorAll('.quick-pill'),
  servingsNumber: document.getElementById('servings-number'),
  btnServingsDec: document.getElementById('btn-servings-dec'),
  btnServingsInc: document.getElementById('btn-servings-inc'),
  checkHasSpices: document.getElementById('check-has-spices'),
  tagInput: document.getElementById('ingredient-input'),
  tagsWrapper: document.getElementById('tags-list'),
  quickTagsContainer: document.getElementById('quick-tags-container'),
  filterForm: document.getElementById('filter-form'),
  selectCategory: document.getElementById('select-category'),
  selectCookTime: document.getElementById('select-cook-time'),
  selectSort: document.getElementById('select-sort'),
  checkStrictBudget: document.getElementById('check-strict-budget'),
  dishesGrid: document.getElementById('dishes-grid'),
  resultsCount: document.getElementById('results-count'),
  resultsExplanation: document.getElementById('results-explanation'),
  emptyState: document.getElementById('empty-state'),
  btnResetFilters: document.getElementById('btn-reset-filters'),

  // Tabs
  btnTabDishes: document.getElementById('btn-tab-dishes'),
  btnTabCombos: document.getElementById('btn-tab-combos'),
  btnTabWeekly: document.getElementById('btn-tab-weekly'),
  btnTabStores: document.getElementById('btn-tab-stores'),
  resultsContainer: document.getElementById('results-container'),
  combosSection: document.getElementById('combos-section'),
  weeklySection: document.getElementById('weekly-section'),
  storesSection: document.getElementById('stores-section'),
  combosGrid: document.getElementById('combos-grid'),
  storesGrid: document.getElementById('stores-grid'),

  viewModeCards: document.getElementById('view-mode-cards'),
  viewModeCombos: document.getElementById('view-mode-combos'),

  // Weekly Planner Elements
  weeklyBudgetSelect: document.getElementById('weekly-budget-select'),
  weeklyGoalSelect: document.getElementById('weekly-goal-select'),
  btnGenerateWeekly: document.getElementById('btn-generate-weekly'),
  weeklyDaysGrid: document.getElementById('weekly-days-grid'),
  weeklyShoppingGrid: document.getElementById('weekly-shopping-grid'),
  btnCopyWeeklyChecklist: document.getElementById('btn-copy-weekly-checklist'),
  wBudgetVal: document.getElementById('w-budget-val'),
  wSpentVal: document.getElementById('w-spent-val'),
  wSavingsVal: document.getElementById('w-savings-val'),

  // Fridge Scanner Elements
  btnScanFridge: document.getElementById('btn-scan-fridge'),
  fridgeScanModal: document.getElementById('fridge-scan-modal'),
  scanModalCloseBtn: document.getElementById('scan-modal-close-btn'),
  btnBrowseFile: document.getElementById('btn-browse-file'),
  fridgeFileInput: document.getElementById('fridge-file-input'),
  scanResultPreview: document.getElementById('scan-result-preview'),
  scanDetectedTags: document.getElementById('scan-detected-tags'),
  btnApplyScannedTags: document.getElementById('btn-apply-scanned-tags'),

  // AI Chef Assistant
  aiChefBtn: document.getElementById('ai-chef-btn'),
  aiChefDrawer: document.getElementById('ai-chef-drawer'),
  btnCloseChef: document.getElementById('btn-close-chef'),
  chefMessages: document.getElementById('chef-messages'),
  chefChatForm: document.getElementById('chef-chat-form'),
  chefChatInput: document.getElementById('chef-chat-input'),

  // Modals
  dishModal: document.getElementById('dish-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalDishContent: document.getElementById('modal-dish-content'),

  addDishModal: document.getElementById('add-dish-modal'),
  btnOpenAddDish: document.getElementById('btn-open-add-dish'),
  addModalCloseBtn: document.getElementById('add-modal-close-btn'),
  addDishForm: document.getElementById('add-dish-form'),

  // Theme
  themeToggle: document.getElementById('theme-toggle'),

  // Backend status
  backendBadge: document.getElementById('backend-status-badge'),
  backendStatusText: document.getElementById('backend-status-text')
};

// ============================================================================
// Initialization & Event Binding
// ============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initBudget();
  initServings();
  initIngredientsTags();
  initDietGoals();
  initFilterControls();
  initTabs();
  initModals();
  initAddDish();
  initWeeklyPlanner();
  initAIChef();
  initFridgeScanner();
  await checkBackendStatus();

  // Initial fetch
  fetchSuggestions();
  fetchStores();
});

async function checkBackendStatus() {
  const health = await API.checkHealth();
  if (health.online) {
    if (Elements.backendBadge) {
      Elements.backendBadge.className = 'backend-status-pill';
      Elements.backendBadge.innerHTML = `<span class="status-dot online"></span> <span>Backend: Online (${health.data?.stats?.totalDishes || 18} món)</span>`;
    }
  } else {
    if (Elements.backendBadge) {
      Elements.backendBadge.className = 'backend-status-pill offline';
      Elements.backendBadge.innerHTML = `<span class="status-dot offline"></span> <span>Chế độ: Offline</span>`;
      Elements.backendBadge.title = 'Chạy với dữ liệu tích hợp sẵn. Hãy khởi động server bằng start.bat để kết nối API đầy đủ.';
    }
  }
}

// ============================================================================
// Theme Toggle
// ============================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  Elements.themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  Elements.themeToggle.innerHTML = theme === 'dark' 
    ? '<i class="bi bi-sun-fill" style="color: #f59e0b;"></i>' 
    : '<i class="bi bi-moon-stars-fill"></i>';
}

let debounceTimer = null;
function debouncedFetchSuggestions(delay = 160) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchSuggestions();
  }, delay);
}

// ============================================================================
// Budget Controls
// ============================================================================
function initBudget() {
  Elements.budgetInput.addEventListener('input', (e) => {
    State.budget = Number(e.target.value);
    Elements.budgetDisplay.textContent = formatCurrency(State.budget);
    updateQuickPillsActiveState();
    debouncedFetchSuggestions(150);
  });

  Elements.budgetInput.addEventListener('change', () => {
    fetchSuggestions();
  });

  Elements.quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const amount = Number(pill.getAttribute('data-amount'));
      State.budget = amount;
      Elements.budgetInput.value = amount;
      Elements.budgetDisplay.textContent = formatCurrency(amount);
      updateQuickPillsActiveState();
      fetchSuggestions();
    });
  });
}

function updateQuickPillsActiveState() {
  Elements.quickPills.forEach(pill => {
    const amount = Number(pill.getAttribute('data-amount'));
    if (amount === State.budget) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

// ============================================================================
// Servings Counter
// ============================================================================
function initServings() {
  Elements.btnServingsDec.addEventListener('click', () => {
    if (State.servings > 1) {
      State.servings--;
      Elements.servingsNumber.textContent = State.servings;
      fetchSuggestions();
    }
  });

  Elements.btnServingsInc.addEventListener('click', () => {
    if (State.servings < 8) {
      State.servings++;
      Elements.servingsNumber.textContent = State.servings;
      fetchSuggestions();
    }
  });

  Elements.checkHasSpices.addEventListener('change', (e) => {
    State.hasSpices = e.target.checked;
    fetchSuggestions();
  });
}

// ============================================================================
// In-stock Ingredients Tags
// ============================================================================
function initIngredientsTags() {
  renderTags();

  // Add tag by typing and pressing Enter
  Elements.tagInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = Elements.tagInput.value.trim();
      if (val && !State.userIngredients.includes(val)) {
        State.userIngredients.push(val);
        Elements.tagInput.value = '';
        renderTags();
        syncQuickTagsState();
        fetchSuggestions();
      }
    }
  });

  // Quick tag pills toggle
  Elements.quickTagsContainer.querySelectorAll('.tag-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const name = pill.getAttribute('data-name');
      const index = State.userIngredients.indexOf(name);
      if (index === -1) {
        State.userIngredients.push(name);
      } else {
        State.userIngredients.splice(index, 1);
      }
      renderTags();
      syncQuickTagsState();
      fetchSuggestions();
    });
  });

  syncQuickTagsState();
}

function renderTags() {
  Elements.tagsWrapper.innerHTML = '';
  State.userIngredients.forEach(item => {
    const tag = document.createElement('span');
    tag.className = 'tag-badge';
    tag.innerHTML = `
      ${item}
      <i class="bi bi-x tag-remove" data-item="${item}" title="Xóa"></i>
    `;
    tag.querySelector('.tag-remove').addEventListener('click', (e) => {
      e.stopPropagation();
      const targetItem = e.target.getAttribute('data-item');
      State.userIngredients = State.userIngredients.filter(i => i !== targetItem);
      renderTags();
      syncQuickTagsState();
      fetchSuggestions();
    });
    Elements.tagsWrapper.appendChild(tag);
  });
}

function syncQuickTagsState() {
  Elements.quickTagsContainer.querySelectorAll('.tag-pill').forEach(pill => {
    const name = pill.getAttribute('data-name');
    if (State.userIngredients.includes(name)) {
      pill.classList.add('selected');
    } else {
      pill.classList.remove('selected');
    }
  });
}

// ============================================================================
// Filter Controls & Form Submission
// ============================================================================
function initFilterControls() {
  Elements.selectCategory.addEventListener('change', (e) => {
    State.category = e.target.value;
    fetchSuggestions();
  });

  Elements.selectCookTime.addEventListener('change', (e) => {
    State.maxCookTime = Number(e.target.value);
    fetchSuggestions();
  });

  Elements.selectSort.addEventListener('change', (e) => {
    State.sortBy = e.target.value;
    fetchSuggestions();
  });

  Elements.checkStrictBudget.addEventListener('change', (e) => {
    State.strictBudget = e.target.checked;
    fetchSuggestions();
  });

  Elements.filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchSuggestions();
  });

  Elements.btnResetFilters.addEventListener('click', () => {
    State.budget = 50000;
    State.servings = 2;
    State.category = 'all';
    State.maxCookTime = 0;
    State.sortBy = 'match';
    State.strictBudget = false;
    State.userIngredients = ['Trứng gà', 'Cà chua'];

    Elements.budgetInput.value = 50000;
    Elements.budgetDisplay.textContent = formatCurrency(50000);
    Elements.servingsNumber.textContent = 2;
    Elements.selectCategory.value = 'all';
    Elements.selectCookTime.value = '0';
    Elements.selectSort.value = 'match';
    Elements.checkStrictBudget.checked = false;

    updateQuickPillsActiveState();
    renderTags();
    syncQuickTagsState();
    fetchSuggestions();
  });
}

// ============================================================================
// Suggestion Fetching & Rendering
// ============================================================================
async function fetchSuggestions() {
  try {
    // If user has spices checked, add gia vi co ban to inventory query
    const ingredientsToSend = [...State.userIngredients];
    if (State.hasSpices && !ingredientsToSend.includes('gia_vi_co_ban')) {
      ingredientsToSend.push('gia vi');
      ingredientsToSend.push('nước mắm');
    }

    const payload = {
      budget: State.budget,
      servings: State.servings,
      userIngredients: ingredientsToSend,
      category: State.category,
      maxCookTime: State.maxCookTime,
      sortBy: State.sortBy,
      strictBudget: State.strictBudget
    };

    const res = await API.getSuggestions(payload);
    if (res.success) {
      State.currentDishes = res.dishes;
      renderDishes(res.dishes);
      updateSummaryMeta(res);
    }
  } catch (err) {
    console.error('Error fetching suggestions:', err);
  }
}

function updateSummaryMeta(res) {
  Elements.resultsCount.textContent = `${res.totalMatches} món`;
  const countWithSavings = res.dishes.filter(d => d.availableCost > 0).length;
  
  if (State.userIngredients.length > 0) {
    Elements.resultsExplanation.innerHTML = `
      Khẩu phần: <strong>${State.servings} người</strong> • Ngân sách: <strong>${formatCurrency(State.budget)}</strong> • 
      Đang tận dụng <strong>${State.userIngredients.length}</strong> nguyên liệu tủ lạnh (${countWithSavings} món tiết kiệm thêm chi phí).
    `;
  } else {
    Elements.resultsExplanation.innerHTML = `
      Khẩu phần: <strong>${State.servings} người</strong> • Ngân sách: <strong>${formatCurrency(State.budget)}</strong> • 
      (Chưa chọn nguyên liệu tủ lạnh — gợi ý theo giá thành đầy đủ).
    `;
  }
}

function renderDishes(dishes) {
  Elements.dishesGrid.innerHTML = '';

  if (!dishes || dishes.length === 0) {
    Elements.emptyState.classList.remove('hidden');
    return;
  }

  Elements.emptyState.classList.add('hidden');

  dishes.forEach(dish => {
    const card = document.createElement('div');
    card.className = 'dish-card';

    // Match badge style
    let matchClass = 'low';
    let matchText = `${dish.matchScore}% Phù hợp`;
    if (dish.matchScore >= 80) {
      matchClass = 'high';
      matchText = `<i class="bi bi-stars"></i> ${dish.matchScore}% Phù hợp`;
    } else if (dish.matchScore >= 50) {
      matchClass = 'medium';
    }

    // Budget badge
    const isFit = dish.isWithinBudget;
    const budgetBadgeHtml = isFit
      ? `<span class="badge-budget-tag fit"><i class="bi bi-check2"></i> Trong ngân sách</span>`
      : `<span class="badge-budget-tag over"><i class="bi bi-exclamation-circle"></i> Vượt ${formatCurrency(dish.missingCost - State.budget)}</span>`;

    // Available ingredients ratio
    const haveRatio = dish.totalIngCount > 0 ? Math.round((dish.availableCount / dish.totalIngCount) * 100) : 0;

    card.innerHTML = `
      <div class="card-image-wrap">
        <img src="${dish.image}" alt="${dish.name}" loading="lazy">
        <div class="badge-match ${matchClass}">${matchText}</div>
        ${budgetBadgeHtml}
      </div>

      <div class="card-content">
        <div class="card-tags">
          <span class="tag-micro">${dish.category}</span>
          ${dish.tags ? dish.tags.map(t => `<span class="tag-micro">${t}</span>`).join('') : ''}
        </div>

        <h4 class="dish-title">${dish.name}</h4>
        <p class="dish-desc">${dish.description}</p>

        <div class="dish-meta-info">
          <span class="meta-item"><i class="bi bi-clock"></i> ${dish.cookTime} phút</span>
          <span class="meta-item"><i class="bi bi-bar-chart"></i> ${dish.difficulty}</span>
          <span class="meta-item"><i class="bi bi-fire"></i> ${dish.calories} kcal</span>
        </div>

        <!-- Cost Breakdown Box -->
        <div class="cost-breakdown-box">
          <div class="cost-row">
            <span class="text-muted"><i class="bi bi-bag-plus"></i> Cần mua thêm:</span>
            <span class="cost-highlight ${isFit ? 'text-success' : 'text-danger'}">
              ${formatCurrency(dish.missingCost)}
            </span>
          </div>
          <div class="cost-row">
            <span class="text-muted"><i class="bi bi-tag"></i> Tổng giá trị món (${dish.servings} người):</span>
            <span>${formatCurrency(dish.scaledTotalCost)}</span>
          </div>
          ${dish.availableCost > 0 ? `
          <div class="cost-row">
            <span class="text-muted" style="color: var(--color-success); font-size: 0.8rem;">
              <i class="bi bi-piggy-bank-fill"></i> Đã có sẵn nguyên liệu trị giá:
            </span>
            <span style="color: var(--color-success); font-weight: 700; font-size: 0.85rem;">
              + ${formatCurrency(dish.availableCost)}
            </span>
          </div>` : ''}

          <!-- Ingredient coverage bar -->
          <div class="ingredient-ratio-bar">
            <div class="ratio-label">
              <span>Đồ có sẵn: <strong>${dish.availableCount}/${dish.totalIngCount} nguyên liệu</strong></span>
              <span>${haveRatio}%</span>
            </div>
            <div class="ratio-track">
              <div class="ratio-fill" style="width: ${haveRatio}%;"></div>
            </div>
          </div>
        </div>

        <button class="btn-card-action" data-id="${dish.id}">
          <span>Xem công thức & nơi mua</span>
          <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    `;

    card.querySelector('.btn-card-action').addEventListener('click', () => {
      openDishDetailModal(dish);
    });

    Elements.dishesGrid.appendChild(card);
  });
}

// ============================================================================
// Dish Detail & Cooking Modal
// ============================================================================
function openDishDetailModal(dish) {
  const isFit = dish.isWithinBudget;
  const remainingOrDeficit = State.budget - dish.missingCost;

  // Split ingredients into Have and Need
  const ingredientsHave = dish.analyzedIngredients.filter(i => i.isAvailable);
  const ingredientsNeed = dish.analyzedIngredients.filter(i => !i.isAvailable);

  const modalHtml = `
    <div class="modal-hero-cover">
      <img src="${dish.image}" alt="${dish.name}">
      <div class="modal-hero-gradient">
        <div class="modal-hero-title-box">
          <h2>${dish.name}</h2>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <span class="tag-micro" style="background: rgba(255,255,255,0.2); color: #fff;">
              <i class="bi bi-clock"></i> Nấu: ${dish.cookTime} phút
            </span>
            <span class="tag-micro" style="background: rgba(255,255,255,0.2); color: #fff;">
              <i class="bi bi-people"></i> Khẩu phần: ${dish.servings} người
            </span>
            <span class="tag-micro" style="background: rgba(255,255,255,0.2); color: #fff;">
              <i class="bi bi-bar-chart"></i> Độ khó: ${dish.difficulty}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-content-grid">
      <!-- Cột Trái: Bảng tính chi phí & Nguyên liệu -->
      <div class="modal-col-left">
        <h4 class="modal-section-title">
          <i class="bi bi-calculator-fill text-accent"></i> Bảng Tính Chi Phí
        </h4>

        <div class="modal-budget-summary">
          <div class="budget-calc-row">
            <span class="text-muted">Ngân sách của bạn:</span>
            <strong>${formatCurrency(State.budget)}</strong>
          </div>
          <div class="budget-calc-row">
            <span class="text-muted">Tổng giá trị món (${dish.servings} người):</span>
            <span>${formatCurrency(dish.scaledTotalCost)}</span>
          </div>
          <div class="budget-calc-row">
            <span class="text-muted">Đã có sẵn trong tủ lạnh:</span>
            <span style="color: var(--color-success); font-weight: 700;">- ${formatCurrency(dish.availableCost)}</span>
          </div>
          <div class="budget-calc-row total">
            <span>Tiền cần bỏ ra mua thêm:</span>
            <span style="color: ${isFit ? 'var(--color-success)' : 'var(--color-danger)'}; font-size: 1.15rem;">
              ${formatCurrency(dish.missingCost)}
            </span>
          </div>
          <div class="budget-calc-row" style="margin-top: 8px;">
            <span class="text-muted">${remainingOrDeficit >= 0 ? 'Ngân sách còn dư:' : 'Vượt ngân sách:'}</span>
            <strong style="color: ${remainingOrDeficit >= 0 ? 'var(--color-success)' : 'var(--color-danger)'};">
              ${formatCurrency(Math.abs(remainingOrDeficit))}
            </strong>
          </div>
        </div>

        <h4 class="modal-section-title">
          <i class="bi bi-basket3-fill text-accent"></i> Nguyên Liệu Cần Cho Món
        </h4>

        <div class="ingredients-list-detail">
          <!-- Cần mua thêm -->
          ${ingredientsNeed.length > 0 ? `
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary); margin: 6px 0;">
              <i class="bi bi-cart-plus"></i> CẦN MUA THÊM (${ingredientsNeed.length} món):
            </div>
            ${ingredientsNeed.map(ing => `
              <div class="ing-item-card need">
                <div>
                  <strong>${ing.name}</strong> (${ing.amount})
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-weight: 700;">~${formatCurrency(ing.scaledPrice)}</span>
                  <span class="ing-status-tag need">Cần mua</span>
                </div>
              </div>
            `).join('')}
          ` : `
            <div class="ing-item-card have" style="margin-bottom: 8px;">
              <span>🎉 Bạn đã có đầy đủ tất cả nguyên liệu trong tủ lạnh! Không cần mua gì thêm!</span>
            </div>
          `}

          <!-- Đã có sẵn -->
          ${ingredientsHave.length > 0 ? `
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-success); margin: 12px 0 6px;">
              <i class="bi bi-check2-circle"></i> ĐÃ CÓ SẴN (0đ):
            </div>
            ${ingredientsHave.map(ing => `
              <div class="ing-item-card have">
                <div>
                  <strong>${ing.name}</strong> (${ing.amount})
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: var(--text-muted); text-decoration: line-through; font-size: 0.8rem;">
                    ${formatCurrency(ing.scaledPrice)}
                  </span>
                  <span class="ing-status-tag have">Đã có</span>
                </div>
              </div>
            `).join('')}
          ` : ''}
        </div>

        <!-- Button Copy Shopping List -->
        ${ingredientsNeed.length > 0 ? `
          <button class="btn-copy-shopping" id="btn-copy-checklist">
            <i class="bi bi-clipboard-check"></i>
            <span>Sao chép danh sách đi chợ</span>
          </button>
        ` : ''}
      </div>

      <!-- Cột Phải: Các Bước Nấu Ăn -->
      <div class="modal-col-right">
        <h4 class="modal-section-title">
          <i class="bi bi-journal-text text-accent"></i> Hướng Dẫn Nấu Ăn Từng Bước
        </h4>

        <div class="steps-timeline">
          ${dish.steps.map(step => `
            <div class="step-item">
              <div class="step-number-bullet">${step.stepNumber}</div>
              <h5>${step.title}</h5>
              <p>${step.detail}</p>
              ${step.tip ? `
                <div class="step-chef-tip">
                  <i class="bi bi-lightbulb-fill"></i> <strong>Mẹo hay:</strong> ${step.tip}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  Elements.modalDishContent.innerHTML = modalHtml;

  // Bind copy checklist action
  const btnCopy = Elements.modalDishContent.querySelector('#btn-copy-checklist');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const itemsListText = ingredientsNeed
        .map(i => `- ${i.name} (${i.amount}): ~${formatCurrency(i.scaledPrice)}`)
        .join('\n');
      
      const textToCopy = `🛒 DANH SÁCH ĐI CHỢ CHO MÓN "${dish.name.toUpperCase()}":\n` +
        `Khẩu phần: ${dish.servings} người\n` +
        itemsListText +
        `\n\nTổng tiền mua thêm dự kiến: ${formatCurrency(dish.missingCost)}`;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Đã sao chép danh sách đi chợ vào bộ nhớ tạm!');
      }).catch(() => {
        showToast('Vui lòng cấp quyền sao chép!');
      });
    });
  }

  Elements.dishModal.classList.remove('hidden');
}

// ============================================================================
// Tabs Handling (Dishes, Combos, Stores)
// ============================================================================
function initTabs() {
  Elements.btnTabDishes.addEventListener('click', () => switchTab('dishes'));
  Elements.btnTabCombos.addEventListener('click', () => switchTab('combos'));
  if (Elements.btnTabWeekly) Elements.btnTabWeekly.addEventListener('click', () => switchTab('weekly'));
  Elements.btnTabStores.addEventListener('click', () => switchTab('stores'));

  Elements.viewModeCards.addEventListener('click', () => switchTab('dishes'));
  Elements.viewModeCombos.addEventListener('click', () => switchTab('combos'));
}

function switchTab(tab) {
  State.activeTab = tab;

  // Nav buttons
  Elements.btnTabDishes.classList.toggle('active', tab === 'dishes');
  Elements.btnTabCombos.classList.toggle('active', tab === 'combos');
  if (Elements.btnTabWeekly) Elements.btnTabWeekly.classList.toggle('active', tab === 'weekly');
  Elements.btnTabStores.classList.toggle('active', tab === 'stores');

  // View switch buttons
  Elements.viewModeCards.classList.toggle('active', tab === 'dishes');
  Elements.viewModeCombos.classList.toggle('active', tab === 'combos');

  // Sections
  Elements.resultsContainer.classList.toggle('hidden', tab !== 'dishes');
  Elements.combosSection.classList.toggle('hidden', tab !== 'combos');
  if (Elements.weeklySection) Elements.weeklySection.classList.toggle('hidden', tab !== 'weekly');
  Elements.storesSection.classList.toggle('hidden', tab !== 'stores');

  if (tab === 'combos') {
    fetchCombos();
  } else if (tab === 'weekly') {
    fetchWeeklyPlan();
  }
}

// ============================================================================
// Combos (Mâm Cơm) Fetching & Rendering
// ============================================================================
async function fetchCombos() {
  try {
    const payload = {
      budget: State.budget,
      servings: State.servings,
      userIngredients: State.userIngredients
    };

    const res = await API.getCombos(payload);
    if (res.success) {
      State.currentCombos = res.data;
      renderCombos(res.data);
    }
  } catch (err) {
    console.error('Error fetching combos:', err);
  }
}

function renderCombos(combos) {
  Elements.combosGrid.innerHTML = '';

  if (!combos || combos.length === 0) {
    Elements.combosGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        <h4>Chưa có combo nào phù hợp với mức ngân sách ${formatCurrency(State.budget)}</h4>
        <p style="color: var(--text-muted);">Hãy thử tăng ngân sách lên từ 70.000đ trở lên để kết hợp được 2-3 món bạn nhé!</p>
      </div>
    `;
    return;
  }

  combos.forEach(combo => {
    const card = document.createElement('div');
    card.className = 'combo-card';

    card.innerHTML = `
      <span class="combo-badge"><i class="bi bi-award-fill"></i> ${combo.type}</span>
      <h4 class="combo-title">${combo.title}</h4>

      <div class="combo-dishes-list">
        ${combo.dishes.map(d => `
          <div class="combo-dish-item">
            <img src="${d.image}" alt="${d.name}" class="combo-dish-thumb">
            <div class="combo-dish-info">
              <h6>${d.name}</h6>
              <span>${d.category} • ${d.cookTime} phút</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="combo-footer">
        <div class="combo-price-block">
          <small>Cần mua thêm (${State.servings} người):</small>
          <strong>${formatCurrency(combo.missingCost)}</strong>
        </div>
        <div style="text-align: right;">
          <small style="color: var(--text-muted); display: block;">Tổng giá trị món:</small>
          <span style="font-weight: 700;">${formatCurrency(combo.totalPrice)}</span>
        </div>
      </div>
    `;

    Elements.combosGrid.appendChild(card);
  });
}

// ============================================================================
// Stores Fetching & Rendering
// ============================================================================
async function fetchStores() {
  try {
    const res = await API.getStores();
    if (res.success) {
      State.storesData = res.data;
      renderStores(res.data);
    }
  } catch (err) {
    console.error('Error fetching stores:', err);
  }
}

function renderStores(stores) {
  Elements.storesGrid.innerHTML = '';

  stores.forEach(store => {
    const card = document.createElement('div');
    card.className = 'store-card';

    card.innerHTML = `
      <div class="store-header">
        <div class="store-icon">
          <i class="${store.icon || 'bi bi-shop'}"></i>
        </div>
        <div class="store-title">
          <h4>${store.name}</h4>
          <span>${store.type} • Mức giá: ${store.avgPriceLevel}</span>
        </div>
      </div>

      <p class="store-desc">${store.description}</p>

      <ul class="store-advantages">
        ${store.advantages.map(adv => `
          <li><i class="bi bi-check-circle-fill"></i> <span>${adv}</span></li>
        `).join('')}
      </ul>

      ${store.tips ? `
        <div style="background: rgba(245, 158, 11, 0.1); border-left: 3px solid #f59e0b; padding: 8px 12px; border-radius: 4px; font-size: 0.8rem; color: #fbbf24; margin-top: auto;">
          <i class="bi bi-lightbulb"></i> ${store.tips}
        </div>
      ` : ''}

      ${store.link ? `
        <a href="${store.link}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="text-align: center; margin-top: 14px; text-decoration: none; font-size: 0.84rem;">
          <i class="bi bi-box-arrow-up-right"></i> Truy cập trang web
        </a>
      ` : ''}
    `;

    Elements.storesGrid.appendChild(card);
  });
}

// ============================================================================
// Modal Events
// ============================================================================
function initModals() {
  Elements.modalCloseBtn.addEventListener('click', () => {
    Elements.dishModal.classList.add('hidden');
  });

  Elements.dishModal.addEventListener('click', (e) => {
    if (e.target === Elements.dishModal) {
      Elements.dishModal.classList.add('hidden');
    }
  });

  // ESC key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      Elements.dishModal.classList.add('hidden');
      Elements.addDishModal.classList.add('hidden');
    }
  });
}

// ============================================================================
// Add Custom Dish Logic
// ============================================================================
function initAddDish() {
  Elements.btnOpenAddDish.addEventListener('click', () => {
    Elements.addDishModal.classList.remove('hidden');
  });

  Elements.addModalCloseBtn.addEventListener('click', () => {
    Elements.addDishModal.classList.add('hidden');
  });

  Elements.addDishModal.addEventListener('click', (e) => {
    if (e.target === Elements.addDishModal) {
      Elements.addDishModal.classList.add('hidden');
    }
  });

  Elements.addDishForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('new-dish-name').value.trim();
    const category = document.getElementById('new-dish-category').value;
    const basePrice = Number(document.getElementById('new-dish-price').value);
    const cookTime = Number(document.getElementById('new-dish-time').value);
    const difficulty = document.getElementById('new-dish-difficulty').value;
    const description = document.getElementById('new-dish-desc').value.trim();
    const ingredientsRaw = document.getElementById('new-dish-ingredients').value;
    const stepsRaw = document.getElementById('new-dish-steps').value;

    const ingredients = ingredientsRaw.split(',').map(item => {
      const clean = item.trim();
      return {
        name: clean,
        amount: 'vừa đủ',
        unit: 'phần',
        estimatedPrice: Math.round(basePrice / 3),
        isEssential: true
      };
    });

    const steps = stepsRaw.split('\n').filter(s => s.trim().length > 0).map((line, idx) => ({
      stepNumber: idx + 1,
      title: `Bước ${idx + 1}`,
      detail: line.trim(),
      tip: ''
    }));

    const newDishData = {
      name,
      category,
      basePrice,
      cookTime,
      difficulty,
      description,
      ingredients,
      steps,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80',
      tags: ['Người dùng thêm', 'Cơm nhà']
    };

    try {
      const res = await API.addDish(newDishData);
      if (res.success) {
        showToast(`Đã thêm món "${name}" thành công!`);
        Elements.addDishModal.classList.add('hidden');
        Elements.addDishForm.reset();
        fetchSuggestions();
      }
    } catch (err) {
      console.error(err);
      showToast('Có lỗi xảy ra khi lưu món ăn!');
    }
  });
}

// ============================================================================
// Diet Goals Implementation
// ============================================================================
function initDietGoals() {
  const goalPills = document.querySelectorAll('.goal-pill');
  goalPills.forEach(pill => {
    pill.addEventListener('click', () => {
      goalPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const goal = pill.getAttribute('data-goal');
      State.dietGoal = goal;

      if (goal === 'saving') {
        State.sortBy = 'cheapest_total';
        Elements.selectSort.value = 'cheapest_total';
      } else if (goal === 'gym') {
        State.sortBy = 'match';
        Elements.selectSort.value = 'match';
      } else if (goal === 'clean') {
        State.category = 'all';
      }
      fetchSuggestions();
    });
  });
}

// ============================================================================
// 7-Day Weekly Meal Planner Implementation
// ============================================================================
function initWeeklyPlanner() {
  if (Elements.btnGenerateWeekly) {
    Elements.btnGenerateWeekly.addEventListener('click', () => {
      fetchWeeklyPlan();
    });
  }

  if (Elements.weeklyBudgetSelect) {
    Elements.weeklyBudgetSelect.addEventListener('change', () => {
      fetchWeeklyPlan();
    });
  }

  if (Elements.weeklyGoalSelect) {
    Elements.weeklyGoalSelect.addEventListener('change', () => {
      fetchWeeklyPlan();
    });
  }

  if (Elements.btnCopyWeeklyChecklist) {
    Elements.btnCopyWeeklyChecklist.addEventListener('click', () => {
      if (!State.currentWeeklyPlan || !State.currentWeeklyPlan.shoppingList) return;
      const listText = State.currentWeeklyPlan.shoppingList
        .map(item => `- ${item.name} (${item.amount}): ~${formatCurrency(item.estimatedPrice)}`)
        .join('\n');
      const copyText = `🛒 DANH SÁCH ĐI CHỢ 1 LẦN CHO CẢ TUẦN (${State.servings} người):\n` +
        `Ngân sách: ${formatCurrency(State.currentWeeklyPlan.weeklyBudget)} | Dự chi: ${formatCurrency(State.currentWeeklyPlan.totalSpent)}\n` +
        `Tiết kiệm được: ${formatCurrency(State.currentWeeklyPlan.remainingSavings)}\n\n` +
        listText;

      navigator.clipboard.writeText(copyText).then(() => {
        showToast('Đã sao chép danh sách đi chợ cả tuần!');
      });
    });
  }
}

async function fetchWeeklyPlan() {
  const budget = Elements.weeklyBudgetSelect ? Number(Elements.weeklyBudgetSelect.value) : 500000;
  const goal = Elements.weeklyGoalSelect ? Elements.weeklyGoalSelect.value : 'balanced';

  try {
    const res = await API.getWeeklyPlan({
      weeklyBudget: budget,
      servings: State.servings,
      dietGoal: goal
    });

    if (res.success && res.data) {
      State.currentWeeklyPlan = res.data;
      renderWeeklyPlan(res.data);
    }
  } catch (err) {
    console.error('Error fetching weekly plan:', err);
  }
}

function renderWeeklyPlan(data) {
  if (Elements.wBudgetVal) Elements.wBudgetVal.textContent = formatCurrency(data.weeklyBudget);
  if (Elements.wSpentVal) Elements.wSpentVal.textContent = formatCurrency(data.totalSpent);
  if (Elements.wSavingsVal) Elements.wSavingsVal.textContent = formatCurrency(data.remainingSavings);

  // Render 7 Day Cards
  if (Elements.weeklyDaysGrid) {
    Elements.weeklyDaysGrid.innerHTML = '';
    data.days.forEach(day => {
      const card = document.createElement('div');
      card.className = 'day-plan-card';

      card.innerHTML = `
        <div class="day-card-header">
          <span class="day-badge"><i class="bi bi-calendar3"></i> ${day.day}</span>
          <span class="day-theme-title">${day.theme}</span>
        </div>

        <div class="day-dishes-wrap">
          ${day.dishes.map(d => `
            <div class="day-dish-row" style="cursor: pointer;" data-id="${d.id}">
              <img src="${d.image}" alt="${d.name}" style="width: 52px; height: 52px; min-width: 52px; max-width: 52px; object-fit: cover; border-radius: 8px; flex-shrink: 0;">
              <div style="flex: 1; overflow: hidden;">
                <h6 style="font-size: 0.92rem; font-weight: 700; margin: 0; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${d.name}</h6>
                <small style="color: var(--text-muted); font-size: 0.78rem;">${d.role} • ${formatCurrency(d.scaledPrice)}</small>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="day-card-footer">
          <span>Chi phí ngày: <strong class="text-success">${formatCurrency(day.dayCost)}</strong></span>
          <small style="color: var(--text-muted);"><i class="bi bi-fire"></i> ~${day.calories} kcal</small>
        </div>
      `;

      card.querySelectorAll('.day-dish-row').forEach(row => {
        row.addEventListener('click', () => {
          const dishId = row.getAttribute('data-id');
          API.getDishById(dishId).then(r => {
            if (r.success) openDishDetailModal(r.data);
          });
        });
      });

      Elements.weeklyDaysGrid.appendChild(card);
    });
  }

  // Render Consolidated Shopping List
  if (Elements.weeklyShoppingGrid && data.shoppingList) {
    Elements.weeklyShoppingGrid.innerHTML = '';
    data.shoppingList.forEach(item => {
      const row = document.createElement('div');
      row.className = 'shop-item-row';
      row.innerHTML = `
        <i class="bi bi-check-circle" style="color: var(--color-success);"></i>
        <div style="flex: 1;">
          <strong>${item.name}</strong> (${item.amount}${item.count > 1 ? ` x${item.count}` : ''})
        </div>
        <span style="font-weight: 700; color: var(--color-primary); font-size: 0.82rem;">~${formatCurrency(item.estimatedPrice)}</span>
      `;
      Elements.weeklyShoppingGrid.appendChild(row);
    });
  }
}

// ============================================================================
// AI Chef Assistant Implementation
// ============================================================================
function initAIChef() {
  if (Elements.aiChefBtn) {
    Elements.aiChefBtn.addEventListener('click', () => {
      Elements.aiChefDrawer.classList.toggle('hidden');
    });
  }

  if (Elements.btnCloseChef) {
    Elements.btnCloseChef.addEventListener('click', () => {
      Elements.aiChefDrawer.classList.add('hidden');
    });
  }

  // Quick prompt chips
  document.querySelectorAll('.quick-prompt').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-q');
      sendChefQuestion(q);
    });
  });

  if (Elements.chefChatForm) {
    Elements.chefChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = Elements.chefChatInput.value.trim();
      if (text) {
        sendChefQuestion(text);
        Elements.chefChatInput.value = '';
      }
    });
  }
}

async function sendChefQuestion(question) {
  // Add user bubble
  appendChefMessage(question, 'outgoing');

  // Add temporary typing indicator
  const typingBubble = document.createElement('div');
  typingBubble.className = 'chef-msg incoming';
  typingBubble.id = 'chef-typing-indicator';
  typingBubble.innerHTML = `<em>Bếp Trưởng đang suy nghĩ công thức... <i class="bi bi-hourglass-split"></i></em>`;
  Elements.chefMessages.appendChild(typingBubble);
  Elements.chefMessages.scrollTop = Elements.chefMessages.scrollHeight;

  try {
    const res = await API.askChefAI(question, State.userIngredients);
    const typing = document.getElementById('chef-typing-indicator');
    if (typing) typing.remove();

    if (res.success) {
      appendChefMessage(res.reply, 'incoming', res.recommendedDish);
    }
  } catch (err) {
    const typing = document.getElementById('chef-typing-indicator');
    if (typing) typing.remove();
    appendChefMessage('Bếp Trưởng AI gặp chút trục trặc mạng, bạn thử hỏi lại nhé!', 'incoming');
  }
}

function appendChefMessage(text, type, dish = null) {
  const msg = document.createElement('div');
  msg.className = `chef-msg ${type}`;
  msg.innerHTML = `<p>${text}</p>`;

  if (dish) {
    const preview = document.createElement('div');
    preview.className = 'chef-dish-preview';
    preview.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}">
      <div style="flex: 1;">
        <strong style="font-size: 0.84rem; display: block;">${dish.name}</strong>
        <small style="color: var(--color-success); font-weight: 700;">~${formatCurrency(dish.basePrice)} • ${dish.cookTime}p</small>
      </div>
      <i class="bi bi-arrow-right-circle text-accent"></i>
    `;
    preview.addEventListener('click', () => {
      API.getDishById(dish.id).then(r => {
        if (r.success) openDishDetailModal(r.data);
      });
    });
    msg.appendChild(preview);
  }

  Elements.chefMessages.appendChild(msg);
  Elements.chefMessages.scrollTop = Elements.chefMessages.scrollHeight;
}

// ============================================================================
// AI Fridge Image Scanner Implementation
// ============================================================================
function initFridgeScanner() {
  if (Elements.btnScanFridge) {
    Elements.btnScanFridge.addEventListener('click', () => {
      Elements.fridgeScanModal.classList.remove('hidden');
    });
  }

  if (Elements.scanModalCloseBtn) {
    Elements.scanModalCloseBtn.addEventListener('click', () => {
      Elements.fridgeScanModal.classList.add('hidden');
    });
  }

  if (Elements.btnBrowseFile) {
    Elements.btnBrowseFile.addEventListener('click', () => {
      Elements.fridgeFileInput.click();
    });
  }

  if (Elements.fridgeFileInput) {
    Elements.fridgeFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        simulateAIScan(['Trứng gà', 'Cà chua', 'Thịt heo băm', 'Hành lá']);
      }
    });
  }

  // Sample chips
  document.querySelectorAll('.sample-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const items = chip.getAttribute('data-items').split(',');
      simulateAIScan(items);
    });
  });

  if (Elements.btnApplyScannedTags) {
    Elements.btnApplyScannedTags.addEventListener('click', () => {
      if (State.scannedItems && State.scannedItems.length > 0) {
        State.scannedItems.forEach(item => {
          if (!State.userIngredients.includes(item)) {
            State.userIngredients.push(item);
          }
        });
        renderTags();
        syncQuickTagsState();
        fetchSuggestions();
        Elements.fridgeScanModal.classList.add('hidden');
        showToast(`Đã thêm ${State.scannedItems.length} nguyên liệu quét được vào tủ lạnh!`);
      }
    });
  }
}

function simulateAIScan(items) {
  State.scannedItems = items;
  if (Elements.scanResultPreview && Elements.scanDetectedTags) {
    Elements.scanDetectedTags.innerHTML = items
      .map(i => `<span class="tag-badge"><i class="bi bi-check2"></i> ${i}</span>`)
      .join('');
    Elements.scanResultPreview.classList.remove('hidden');
  }
}
