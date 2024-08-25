import { customElement, html, property } from '../lit';
import { AMElement } from '../base';

@customElement('header-nav')
export class HeaderNav extends AMElement
{
  render()
  {
    return html`
    <nav class="flex items-center justify-end">
      <a class="flex items-center justify-center w-11 h-11 link" aria-label="icons/email.svg profile link">
        <img page="contact" src="${origin}/icons/email.svg" alt="contact" class="w-9 h-9">
      </a>
      <a target="_blank" rel="noopener" class="flex items-center justify-center w-11 h-11 link"
        aria-label="icons/logo--linkedin.svg profile link" href="https://www.linkedin.com/in/aeronmiles/">
        <img src="${origin}/icons/logo--linkedin.svg" alt="linkedin" class="w-9 h-9">
      </a>
      <a target="_blank" rel="noopener" class="flex items-center justify-center w-11 h-11 link"
        aria-label="icons/logo--github.svg profile link" href="https://github.com/aeronmiles">
        <img src="${origin}/icons/logo--github.svg" alt="github" class="w-9 h-9">
      </a>
    </nav>`
  }
}

@customElement('nav-button')
export class NavButton extends AMElement
{
  @property({ type: String }) href = '';
  @property({ type: String }) icon = html`<svg class="w-9 h-9 text-gray-200" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
  </svg>`;

  render()
  {
    return html`
      <a href="${this.href}" class="inline-flex items-center justify-center px-4 py-2 bg-secondary-850 text-white font-bold text-base rounded-md hover:bg-secondary-600 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
        ${this.icon ? html`<span class="mr-2">${this.icon}</span>` : ''}
      </a>
    `;
  }
}

@customElement('am-header')
export class Header extends AMElement
{
  render()
  {
    return html`
    <header class="z-40 relative py-4 bounds">
      <div class="container mx-auto flex items-center justify-between px-4">
        <a class="flex items-center link">
          <!-- <span page="home" class="leading-none font-normal text-base tracking-wide6 hidden sm:block">
                      AERON<b page="home">MILES</b>
                  </span> -->
          <nav-button class="sm:"></nav-button>
          <!-- <menu class="hidden sm:block"></menu> -->
          <!-- <span class="sm:hidden link">
            <img page="home" src="${origin}/assets/logo/am-logo-round-grayscale.svg" alt="home" class="w-11 h-11">
          </span> -->
        </a>
        <span class="absolute left-1/2 transform -translate-x-1/2 hidden sm:block link">
          <img page="home" src="${origin}/assets/logo/am-logo-round-grayscale.svg" alt="home" class="w-11 h-11">
        </span>
        <header-nav></header-nav>
      </div>
    </header>`
  }
}