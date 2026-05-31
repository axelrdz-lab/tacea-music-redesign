async function loadProductDetails() {

  const res = await fetch('../data/products.json');
  const products = await res.json();

  const productId = new URLSearchParams(window.location.search).get('id');
  const product = products.find(p => p.id == productId)

  if (!product) {
    document.querySelector('.post-details').innerHTML = '<p>Post no encontrado.</p>';
    return;
  }
  
  // access to the path correctly 
  document.getElementById('product-img').src = '.' + product.images.main 
  const productCategory = document.getElementById('product-category')
  productCategory.textContent = product.category
  productCategory.href = `./catalog.html?category=${product.category}`
  document.getElementById('product-name').textContent = product.name
  document.getElementById('product-description').textContent = product.description

  let finalPrice = product.price
  const formattedOriginalPrice = product.price.toLocaleString('es-MX', {
    style: 'currency', currency: 'MXN'
  })
  if (product.discount > 0) {
    finalPrice = product.price - product.price * (product.discount/100)
    document.getElementById('product-price-before-discount').textContent = formattedOriginalPrice
  }  
  const formattedFinalPrice = finalPrice.toLocaleString('es-MX', {
    style: 'currency', currency: 'MXN'
  });
  document.getElementById('product-price').textContent = formattedFinalPrice

  const addImgsContainer = document.getElementById('product-aditional-imgs');
  const additionalImages = product.images.gallery

  let counter = 0
  additionalImages.forEach(image => {
    const img = document.createElement('img');
    img.src = '.' + product.images.main
    if(counter === 0) img.classList.add('active')
    counter++
    addImgsContainer.appendChild(img);
  });

  
  await loadSuggestedProducts(product.category, product.id);
  await loadReviews(product.id);
  setupProductQuantity();

}

async function loadSuggestedProducts(category, id) {

  const res = await fetch('../data/products.json')
  const products = await res.json()

  const productContainer = document.getElementById('suggested-products')
  let relatedProducts = products.filter(p => p.category === category && p.id != id)

  if (relatedProducts.length === 0) {
    const sortedProducts = products.sort((a, b) => new Date(b.date) - new Date(a.date))
    relatedProducts = sortedProducts.filter(p => p.id != id)
  }

  relatedProducts.forEach(product => {

    const card = document.createElement('product-card');

    card.setAttribute('name', product.name);
    card.setAttribute('price', product.price);
    card.setAttribute('category', product.category);
    card.setAttribute('image', `.${product.images.main}`);
    card.setAttribute('href', `./product.html?id=${product.id}`);

    productContainer.appendChild(card);

  });

}

async function loadReviews(productId) {

  const res = await fetch('../data/reviews.json')
  const allReviews = await res.json()
  const productReviews = allReviews.filter(r => r.productId === productId)

  const container = document.getElementById('product-reviews')
  if (productReviews.length === 0) {
    const message = document.getElementById('product-reviews-is-empty')
    message.style.display = 'flex'
    message.textContent = 'No hay reseñas aún'
    return;
  }
  productReviews.forEach(review => {
    const reviewElement = document.createElement('review-card')
    reviewElement.setAttribute('author', review.author)
    reviewElement.setAttribute('date', review.date)
    reviewElement.setAttribute('title', review.title)
    reviewElement.setAttribute('body', review.body)
    container.appendChild(reviewElement)
  })

}

let currentQuantity = 1;
async function setupProductQuantity() {

  const quantityContainer = document.querySelector('.product-quantity');
  const quantitySpan = document.getElementById('product-quantity-value');

  quantityContainer.addEventListener('click', (event) => {
    
    const button = event.target.closest('button');
    if (!button) return;

    const action = button.dataset.action;
    if (action === 'increase') {
      currentQuantity++;
    } else if (action === 'decrease') {
      if (currentQuantity > 1) {
        currentQuantity--;
      }
    }
    quantitySpan.textContent = currentQuantity;
  });
  
}

loadProductDetails();