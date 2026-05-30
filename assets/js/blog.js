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
      <span class="pill-badge">${post.date}</span>
    `;
  });

}

async function loadPosts(category = 'todas') {

  const res = await fetch('../data/posts.json');
  const posts = await res.json();

  const postsContainer = document.querySelector('.post-list');
  postsContainer.innerHTML = ''; // limpiar posts anteriores

  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  let filteredPosts;
  
  if (category === 'todas') {
    filteredPosts = sortedPosts
  }
  else if (category === 'populares') {
    filteredPosts = sortedPosts.sort((a,b) => b.views - a.views)
  } else {
    filteredPosts = posts.filter(post => post.categories.includes(category));
  }


  filteredPosts.forEach(post => {
    const newPost = document.createElement('post-card')
    newPost.setAttribute('href', `post.html?id=${post.id}`)
    newPost.setAttribute('cover', post.cover)
    newPost.setAttribute('categories', JSON.stringify(post.categories))
    newPost.setAttribute('title', post.title)
    newPost.setAttribute('excerpt', post.excerpt)
    newPost.setAttribute('views', post.views)
    postsContainer.appendChild(newPost)
  });

}

async function loadPostCategories() {

  const res = await fetch('../data/posts.json');
  const posts = await res.json();

  const container = document.querySelector('#posts-categories');

  const staticCategories = ['todas', 'populares'];
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