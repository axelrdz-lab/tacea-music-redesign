
async function loadCategories() {
  const res = await fetch('./data/categories.json');
  const categories = await res.json();

  // agregar categorias al div del carrusel
  const carousel = document.querySelector('#categories_carousel');
  categories.forEach(category => {
    const catDiv = document.createElement('a');
    catDiv.classList.add('cat');
    catDiv.href = `./pages/catalog.html?category=${category.id}`;
    catDiv.innerHTML = /*html*/`
      <img src="${category.image}" alt="${category.name}">
      <span class="pill-badge">${category.name}</span>
    `;
    carousel.appendChild(catDiv);
  });
}

async function loadSpecialOffers() {
  const res = await fetch('./data/products.json');
  const products = await res.json();

  // filtrar productos en oferta
  const specialOffers = products.filter(product => product.discount > 0);

  // agregar productos en oferta al div del carrusel
  const carousel = document.querySelector('#special_offers_carousel');
  specialOffers.forEach(product => {
    const productCard = document.createElement('product-card')

    productCard.setAttribute('name', product.name);
    productCard.setAttribute('price', product.price);
    productCard.setAttribute('category', product.category);
    productCard.setAttribute('image', product.images.main);
    productCard.setAttribute('href', `./pages/product.html?id=${product.id}`);

    carousel.appendChild(productCard);
  });
}

async function loadGetTheirStyleFeaturedProduct() {

  const res = await fetch('./data/products.json');
  const products = await res.json();
  
  const featuredProduct = products.find(p => p.featured);

  const productPrice = featuredProduct.price.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN'
  })
  document.getElementById('featured-product-price').textContent = productPrice
  document.getElementById('featured-product-link').href = `./pages/product.html?id=${featuredProduct.id}`
  
}

loadCategories();
loadSpecialOffers();
loadGetTheirStyleFeaturedProduct();