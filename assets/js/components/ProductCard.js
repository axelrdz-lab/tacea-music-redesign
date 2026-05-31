class ProductCard extends HTMLElement {

  connectedCallback() {

    const name = this.getAttribute('name');
    const price = parseFloat(this.getAttribute('price'));
    const category = this.getAttribute('category');
    const image = this.getAttribute('image');
    const href = this.getAttribute('href');

    const formattedPrice = price.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN'
    });

    const isRoot = !window.location.pathname.includes('/pages/');
    const base = isRoot ? '.' : '..';

    this.innerHTML = /*html*/`
      <img src="${image}" alt="${name}">
      <a class="product-category" href="${base}/pages/catalog.html?category=${category}">${category}</a>
      <h3>${name}</h3>
      <div class="row">
        <p>${formattedPrice}</p>
        <a class="btn-icon">
          <svg class="default-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V3C3.00488 2.44772 3.4526 2 4.00488 2H20.0049C20.5572 2 21.0049 2.44772 21.0049 3V21C21.0049 21.5523 20.5572 22 20.0049 22ZM19.0049 20V4H5.00488V20H19.0049ZM9.00488 6V8C9.00488 9.65685 10.348 11 12.0049 11C13.6617 11 15.0049 9.65685 15.0049 8V6H17.0049V8C17.0049 10.7614 14.7663 13 12.0049 13C9.24346 13 7.00488 10.7614 7.00488 8V6H9.00488Z"></path>
          </svg>
          <svg class="hover-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V3C3.00488 2.44772 3.4526 2 4.00488 2H20.0049C20.5572 2 21.0049 2.44772 21.0049 3V21C21.0049 21.5523 20.5572 22 20.0049 22ZM9.00488 6H7.00488V8C7.00488 10.7614 9.24346 13 12.0049 13C14.7663 13 17.0049 10.7614 17.0049 8V6H15.0049V8C15.0049 9.65685 13.6617 11 12.0049 11C10.348 11 9.00488 9.65685 9.00488 8V6Z"></path>
        </svg>
        </a>
        <a class="btn-icon">
          <svg class="default-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
          </svg>
          <svg class="hover-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path>4
          </svg>
        </a>
      </div>
    `;

    this.style.cursor = 'pointer';
    this.addEventListener('click', () => {
      window.location.href = href;
    });
    this.querySelectorAll('.product-category, .btn-icon').forEach(element => {
      element.addEventListener('click', (e) => {
        e.stopPropagation(); 
      });
    });

  }

}

customElements.define('product-card', ProductCard);