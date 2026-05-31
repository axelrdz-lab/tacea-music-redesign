class TaceaNavbar extends HTMLElement {

  connectedCallback() {

    const isRoot = !window.location.pathname.includes('/pages/');
    const base = isRoot ? '.' : '..';

    this.innerHTML = /*html*/`
      <!-- navigation menu -->
      <header class="column">
        <!-- top navbar -->
        <div class="row top-navbar">
          <div class="row logo">
            <!-- hamburger menu -->
            <button class="hamburger-btn btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
              </svg>
            </button>
            <!-- logo -->
            <a href="${base}/index.html">
              <img class="header-logo" src="${base}/assets/img/logo_tacea.png" alt="logo Tacea Music">
            </a>   
          </div> 
          <!-- links -->
          <nav class="navbar-links">
            <ul>
              <li><a class="btn-outline" href="${base}/index.html">Inicio</a></li>
              <li><a class="btn-outline" href="${base}/pages/blog.html">Blog</a></li>
              <li><a class="btn-outline" href="${base}/pages/contacto.html">Contacto</a></li>
            </ul>
          </nav>
          <!-- other actions -->
          <div class="row navbar-actions">
            <!-- search button -->
            <div class="search-container row" id="search-container">
              <input type="text" placeholder="Buscar..." id="search-bar">
              <button class="btn-icon btn-search" id="search-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                </svg>
              </button>
            </div>
            <!-- shopping bag button -->
            <a href="#" class="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V3C3.00488 2.44772 3.4526 2 4.00488 2H20.0049C20.5572 2 21.0049 2.44772 21.0049 3V21C21.0049 21.5523 20.5572 22 20.0049 22ZM19.0049 20V4H5.00488V20H19.0049ZM9.00488 6V8C9.00488 9.65685 10.348 11 12.0049 11C13.6617 11 15.0049 9.65685 15.0049 8V6H17.0049V8C17.0049 10.7614 14.7663 13 12.0049 13C9.24346 13 7.00488 10.7614 7.00488 8V6H9.00488Z"></path>
              </svg>
            </a>
            <!-- user account button -->
            <a href="#" class="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
              </svg>
            </a>
          </div>
        </div>
        <!-- bottom links -->
        <div class="row bottom-navbar">
          <a href="${base}/pages/catalog.html?category=guitarras"><span>Guitarras</span></a>
          <a href="${base}/pages/catalog.html?category=bajos"><span>Bajos</span></a>
          <a href="${base}/pages/catalog.html?category=teclados"><span>Teclados</span></a>
          <a href="${base}/pages/catalog.html?category=baterias"><span>Baterías</span></a>
          <div class="vertical-div"></div>
          <a href="${base}/pages/catalog.html?order=mas-vendidos"><span>Más vendidos</span></a>
          <a href="${base}/pages/catalog.html?category=ofertas"><span>Ofertas</span></a>
        </div>
      </header>

      <!-- responsive navbar: DRAWER-->
      <div class="drawer-overlay" id="drawer-overlay"></div>
      <nav class="drawer column" id="drawer">
        <div class="drawer-header row">
            <a href="${base}/index.html">
              <img class="header-logo" src="${base}/assets/img/logo_tacea.png" alt="logo Tacea Music">
            </a>
            <button class="drawer-close btn-icon" id="drawer-close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
            </svg>
          </button>
        </div>
        <ul class="column">
          <li><a href="${base}/index.html">Inicio</a></li>
          <li><a href="${base}/pages/blog.html">Blog</a></li>
          <li><a href="${base}/pages/contacto.html">Contacto</a></li>
        </ul>
        <div class="drawer-divider"></div>
        <ul class="column">
          <li><a href="${base}/pages/catalog.html?category=guitarras">Guitarras</a></li>
          <li><a href="${base}/pages/catalog.html?category=bajos">Bajos</a></li>
          <li><a href="${base}/pages/catalog.html?category=teclados">Teclados</a></li>
          <li><a href="${base}/pages/catalog.html?category=baterias">Baterías</a></li>
          <li><a href="${base}/pages/catalog.html?order=mas-vendidos">Más vendidos</a></li>
          <li><a href="${base}/pages/catalog.html?category=ofertas">Ofertas</a></li>
        </ul>
      </nav>
    `;

    /* search */
    const searchContainer = this.querySelector('#search-container')
    const searchBtn = this.querySelector('#search-btn')
    const searchBar = this.querySelector('#search-bar')
    const toggleSearchbar = () => {
      searchContainer.classList.toggle('open');
      if (!searchContainer.classList.contains('open')) searchBar.value = '';
    }
    searchBtn.addEventListener('click', toggleSearchbar)

    /* overlay references */
    const hamburgerBtn = this.querySelector('.hamburger-btn');
    const drawerClose = this.querySelector('#drawer-close');
    const drawer = this.querySelector('#drawer');
    const overlay = this.querySelector('#drawer-overlay');

    const openDrawer = () => {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    hamburgerBtn.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

  }
  
}

customElements.define('tacea-navbar', TaceaNavbar);