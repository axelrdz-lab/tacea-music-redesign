
async function loadCategories() {
  const res = await fetch('./data/categories.json');
  const categories = await res.json();

  // agregar categorias al div del carrusel
  const carousel = document.querySelector('#categories_carousel');
  categories.forEach(category => {
    const catDiv = document.createElement('a');
    catDiv.classList.add('cat');
    catDiv.href = `product-list.html?category=${category.id}`;
    catDiv.innerHTML = /*html*/`
      <img src="${category.image}" alt="${category.name}">
      <p class="pill-badge">${category.name}</p>
    `;
    carousel.appendChild(catDiv);
  });
}

async function loadSpecialOffers() {
  const res = await fetch('./data/products.json');
  const products = await res.json();

  // filtrar productos en oferta
  const specialOffers = products.filter(product => !product.featured);

  // agregar productos en oferta al div del carrusel
  const carousel = document.querySelector('#special_offers_carousel');
  specialOffers.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-card');
    productDiv.innerHTML = /*html*/`
      <img src="${product.images.main}" alt="${product.name}">
      <a class="product-category" href="product-list.html?category=${product.categoryId}">${product.category}</a>
      <h3>${product.name}</h3>
      <div class="row">
        <p>$${product.price.toFixed(2)}</p>
        <a class="btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V3C3.00488 2.44772 3.4526 2 4.00488 2H20.0049C20.5572 2 21.0049 2.44772 21.0049 3V21C21.0049 21.5523 20.5572 22 20.0049 22ZM19.0049 20V4H5.00488V20H19.0049ZM9.00488 6V8C9.00488 9.65685 10.348 11 12.0049 11C13.6617 11 15.0049 9.65685 15.0049 8V6H17.0049V8C17.0049 10.7614 14.7663 13 12.0049 13C9.24346 13 7.00488 10.7614 7.00488 8V6H9.00488Z"></path>
          </svg>
        </a>
        <a class="btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
          </svg>
        </a>
      </div>
    `;
    carousel.appendChild(productDiv);
  });
}

loadCategories();
loadSpecialOffers();