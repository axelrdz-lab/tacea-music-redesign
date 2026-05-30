class ReviewCard extends HTMLElement {

  connectedCallback() {

    const author = this.getAttribute('author')
    const date = this.getAttribute('date')
    const title = this.getAttribute('title')
    const body = this.getAttribute('body')
    const image = this.getAttribute('image')

    const formatter = new Intl.DateTimeFormat('es-MX', { 
      day: 'numeric',
      month: 'long',  
      year: 'numeric'
    });
    const formattedDate = formatter.format(new Date(date + 'T00:00:00'));

    this.innerHTML = /*html*/`
      <div class="card-content">
        <div class="row">
          <img src="../assets/img/user.jpeg" alt="">
          <div class="column">
            <span>${author}</span>
            <p class="date">${formattedDate}</p>
          </div>
        </div>
        <h3>${title}</h3>
        <p class="post-excerpt">${body}</p>
      </div>
    `;

  }

}

customElements.define('review-card', ReviewCard)