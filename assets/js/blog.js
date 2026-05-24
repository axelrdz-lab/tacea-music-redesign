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
    postContainer.innerHTML = /*html*/`
      <div class="card">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>  
      </div>
      <p class="pill-badge">${post.date}</p>
    `;
  });

}

async function loadPosts() {

  const res = await fetch('../data/posts.json');
  const posts = await res.json();

  const postsContainer = document.querySelector('.post-list');

  posts.forEach(post => {
    const postElement = document.createElement('a');
    postElement.classList.add('card');
    postElement.href = `post.html?id=${post.id}`;
    postElement.innerHTML = /*html*/`
      <img src=${post.cover} alt="${post.title}">
      <div class="card-content">
        <a href="#">${post.category}</a>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });

}

loadFeaturedPosts();
loadPosts();