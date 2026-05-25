async function loadPostContent() {

  const metadataRes = await fetch('../data/posts.json');
  const posts = await metadataRes.json();

  const postId = new URLSearchParams(window.location.search).get('id');
  const post = posts.find(p => p.id == postId);

  if (!post) {
    document.querySelector('.post-content').innerHTML = '<p>Post no encontrado.</p>';
    return;
  } 

  const categoryContainer = document.getElementById('post-categories');
  post.categories.forEach(category => {
    const categoryBadge = document.createElement('a');
    categoryBadge.className = 'category-btn';
    categoryBadge.textContent = category;
    categoryBadge.href = `../index.html?category=${encodeURIComponent(category)}`;
    categoryContainer.appendChild(categoryBadge);
  });

  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-author').textContent = post.author.name;
  document.getElementById('post-date').textContent = post.date;
  document.getElementById('post-read-time').textContent = post.readTime + " min";
  document.getElementById('post-image').src = post.cover;

  const contentRes = await fetch(post.contentPath);
  const contentMarkdown = await contentRes.text();
  document.getElementById('post-content').innerHTML = marked.parse(contentMarkdown);

}

async function loadRelatedPosts() {

  const res = await fetch('../data/posts.json');
  const posts = await res.json();

  const postId = new URLSearchParams(window.location.search).get('id');
  const currentPost = posts.find(p => p.id == postId);
  const relatedPosts = posts
    .filter(p => p.id != postId && p.categories.some(cat => currentPost.categories.includes(cat))).slice(0, 3);

  const postsContainer = document.getElementById('related-posts');
  const responsivePostsContainer = document.getElementById('related-posts-column');


  relatedPosts.forEach(post => {
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
    responsivePostsContainer.appendChild(postElement.cloneNode(true));
  });

}

loadPostContent();
loadRelatedPosts();