class TaceaDropdown extends HTMLElement {

  connectedCallback() {

    const text = this.getAttribute('text');

    this.innerHTML = /*html*/`
      <div class="row trigger">
        <span>${text}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
        </svg>
      </div>
      <div class="dropdown-content"></div>
    `

    const trigger = this.querySelector('.trigger');
    
    this.addEventListener('click', (e) => {
      
      e.stopPropagation()
      document.querySelectorAll('tacea-dropdown').forEach(d => {
        if (d !== this) d.classList.remove('open');
      });
      this.classList.toggle('open');
    })

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        this.classList.remove('open');
      }
    });

  }

}

customElements.define('tacea-dropdown', TaceaDropdown)