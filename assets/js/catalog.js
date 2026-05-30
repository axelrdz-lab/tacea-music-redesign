async function loadProducts() {

  const res = await fetch('../data/products.json')
  const products = await res.json()

  const category = new URLSearchParams(window.location.search).get('category')
  const filteredProducts = products.filter(p => p.category === category)
  const gridContainer = document.querySelector('.catalog-grid')

  products.forEach(product => {

    const element = document.createElement('product-card')
    element.setAttribute('image', `.${product.images.main}`)
    element.setAttribute('category', product.category)
    element.setAttribute('name', product.name)
    element.setAttribute('price', product.price)
    element.setAttribute('href', `/pages/product.html?id=${product.id}`);

    gridContainer.appendChild(element)
    
  });
  
}

loadProducts()