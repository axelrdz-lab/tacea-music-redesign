let allProducts = [];
const filters = {
  categories: [],
  brands: [],
  priceMin: null,
  priceMax: null,
  order: 0
};

async function init() {
  const res = await fetch('../data/products.json');
  allProducts = await res.json();

  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get('category');
  const urlBrand = params.get('brand');

  if (urlCategory) filters.categories.push(urlCategory);
  if (urlBrand) filters.brands.push(urlBrand);

  await setupCategoryFilter();
  setupBrandsFilter();
  setupPriceFilter();
  setupOrder();
  setupResetButton();
  renderProducts();

}

function setupBrandsFilter() {

  const brandFilter = document.getElementById('brand-filter');
  const brandContent = brandFilter.querySelector('.dropdown-content');

  const brands = [...new Set(
    allProducts
      .map(p => p.specs?.brand)
      .filter(Boolean) // quitar null & undefined
  )];

  brands.forEach(brand => {
    const label = document.createElement('label');
    label.classList = 'filter-option';
    label.innerHTML = /*html*/`
      <input type="checkbox" value="${brand}" 
        ${filters.brands.includes(brand) ? 'checked' : ''}>
      <p>${brand}</p>
    `;
    label.querySelector('input').addEventListener('change', (e) => {
      if (e.target.checked) {
        filters.brands.push(brand);
      } else {
        filters.brands = filters.brands.filter(b => b !== brand);
      }
      renderProducts();
    });
    brandContent.appendChild(label);
  });
}
function setupPriceFilter() {

  const priceFilter = document.getElementById('price-filter');
  const priceContent = priceFilter.querySelector('.dropdown-content');

  const prices = allProducts.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  priceContent.innerHTML = /*html*/`
    <div class="price-range">
      <label>
        <p>Mínimo</p>
        <input type="number" id="price-min" 
          min="${min}" max="${max}" value="${min}" step="100">
      </label>
      <label>
        <p>Máximo</p>
        <input type="number" id="price-max" 
          min="${min}" max="${max}" value="${max}" step="100">
      </label>
    </div>
  `;

  priceContent.querySelector('#price-min').addEventListener('change', (e) => {
    filters.priceMin = parseFloat(e.target.value);
    renderProducts();
  });

  priceContent.querySelector('#price-max').addEventListener('change', (e) => {
    filters.priceMax = parseFloat(e.target.value);
    renderProducts();
  });
}
async function setupCategoryFilter() {

  const categoryFilter = document.getElementById('category-filter');
  const categoryContent = categoryFilter.querySelector('.dropdown-content');

  const resCategories = await fetch('../data/categories.json');
  const categories = await resCategories.json();

  categories.forEach(category => {
    const label = document.createElement('label');
    label.classList = 'filter-option';
    label.innerHTML = /*html*/`
      <input type="checkbox" value="${category.id}"
        ${filters.categories.includes(category.id) ? 'checked' : ''}>
      <p>${category.name}</p>
    `;
    label.querySelector('input').addEventListener('change', (e) => {
      if (e.target.checked) {
        filters.categories.push(category.id);
      } else {
        filters.categories = filters.categories.filter(c => c !== category.id);
      }
      renderProducts();
    });
    categoryContent.appendChild(label);
  });
}
function setupOrder() {

  const orderController = document.getElementById('order-controller');
  const controllerContent = orderController.querySelector('.dropdown-content');

  const orderOptions = [
    { id: 0, name: 'Más vendidos' },
    { id: 1, name: 'Alfabéticamente (A-Z)' },
    { id: 2, name: 'Alfabéticamente (Z-A)' },
    { id: 3, name: 'Precio (menor a mayor)' },
    { id: 4, name: 'Precio (mayor a menor)' },
  ];

  orderOptions.forEach(option => {
    const label = document.createElement('label');
    label.classList = 'filter-option';
    label.innerHTML = /*html*/`
      <input type="radio" name="order" value="${option.id}">
      <p>${option.name}</p>
    `;
    label.querySelector('input').addEventListener('change', () => {
      filters.order = option.id;
      renderProducts();
    });
    controllerContent.appendChild(label);
  }) 

}
function setupResetButton() {
  const resetBtn = document.getElementById('reset-filters-btn');
  resetBtn.addEventListener('click', () => {
    
    filters.categories = [];
    filters.brands = [];
    filters.priceMin = null;
    filters.priceMax = null;
    filters.order = 0;

    document.querySelectorAll('.dropdown-content input[type="checkbox"]')
      .forEach(cb => cb.checked = false);
    document.querySelectorAll('.dropdown-content input[type="radio"]')
      .forEach(rb => rb.checked = false);

    const prices = allProducts.map(p => p.price);
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    if (priceMin) priceMin.value = Math.min(...prices);
    if (priceMax) priceMax.value = Math.max(...prices);

    renderProducts();
  });
}

function renderProducts() {

  const gridContainer = document.querySelector('.catalog-grid');
  gridContainer.innerHTML = '';

  let filtered = [...allProducts];

  if (filters.categories.length > 0) {
    filtered = filtered.filter(p => filters.categories.includes(p.category));
  }

  if (filters.brands.length > 0) {
    filtered = filtered.filter(p => filters.brands.includes(p.specs?.brand));
  }

  if (filters.priceMin !== null) {
    filtered = filtered.filter(p => p.price >= filters.priceMin);
  }

  if (filters.priceMax !== null) {
    filtered = filtered.filter(p => p.price <= filters.priceMax);
  }

  switch (filters.order) {
    case 1:
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 2:
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 3:
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 4:
      filtered.sort((a, b) => b.price - a.price);
      break;
  }

  if (filtered.length === 0) {
    gridContainer.innerHTML = '<div class="info-card" id="catalog-is-empty">No se encontraron productos</div>'
    const message = document.querySelector('#catalog-is-empty')
    message.style.display = 'flex'
    return;
  }

  filtered.forEach(product => {
    const element = document.createElement('product-card');
    element.setAttribute('image', `.${product.images.main}`);
    element.setAttribute('category', product.category);
    element.setAttribute('name', product.name);
    element.setAttribute('price', product.price);
    element.setAttribute('href', `./product.html?id=${product.id}`);
    gridContainer.appendChild(element);
  });

  console.log(filters.order)
}

init();