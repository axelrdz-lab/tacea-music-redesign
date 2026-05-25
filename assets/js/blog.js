async function loadFeaturedPosts() {
  
  const res = await fetch('../data/posts.json');
  const posts = await res.json();
  const featuredPosts = posts.filter(post => post.featured);

  // agregar posts destacados a la seccion de destacados
  const featuredSection = document.querySelector('.featured_posts');

  const rightPost = document.querySelector('#right-post');
  const leftTopPost = document.querySelector('#left-top-post');
  const leftBottomPost = document.querySelector('#left-bottom-post');

  const containers = [rightPost, leftTopPost, leftBottomPost];
  const targets = [featuredPosts[0], featuredPosts[1], featuredPosts[2]];
  
  targets.forEach((post, index) => {
    const postContainer = containers[index];
    postContainer.style.backgroundImage = `url(${post.cover})`;
    postContainer.href = `post.html?id=${post.id}`;
    postContainer.innerHTML = /*html*/`
      <div class="card">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>  
      </div>
      <p class="pill-badge">${post.date}</p>
    `;
  });

}

async function loadPosts(category = 'todas') {

  const res = await fetch('../data/posts.json');
  const posts = await res.json();

  const postsContainer = document.querySelector('.post-list');
  postsContainer.innerHTML = ''; // limpiar posts anteriores

  const filteredPosts = category === 'todas' 
    ? posts 
    : posts.filter(post => post.categories.includes(category));

  filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  filteredPosts.forEach(post => {
    const postElement = document.createElement('a');
    postElement.classList.add('post-card');
    postElement.href = `post.html?id=${post.id}`;

    const categoriesHTML = post.categories.map(category => {
      return /*html*/`
        <a href="../index.html?category=${encodeURIComponent(category)}" class="category-btn">${category}</a>
      `;
    }).join('');

    postElement.innerHTML = /*html*/`
      <img src=${post.cover} alt="${post.title}">
      <div class="card-content">
        <div class="row">${categoriesHTML}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });

}

async function loadPostCategories() {

  const res = await fetch('../data/posts.json');
  const posts = await res.json();

  const container = document.querySelector('#posts-categories');

  const staticCategories = ['todas', '+ recientes', '+ populares'];
  const postCategories = [...new Set(posts.flatMap(post => post.categories))];
  const categories = [...staticCategories, ...postCategories];

  categories.forEach(category => {
    const categoryBtn = document.createElement('button');
    categoryBtn.classList.add('category-btn');
    if (category === 'todas') categoryBtn.classList.add('active');
    categoryBtn.dataset.category = category;
    categoryBtn.textContent = category;
    categoryBtn.addEventListener('click', () => {
      onCategorySelected(categoryBtn);
    });
    container.appendChild(categoryBtn);
  });

}

function onCategorySelected(categoryBtn) {

  const category = categoryBtn.dataset.category;
  // desactivar todos los botones
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  categoryBtn.classList.add('active');
  loadPosts(category);

}

loadFeaturedPosts();
loadPosts();
loadPostCategories();