import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/all';


@customElement('m-header')
export class MHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      background-color: var(--md-sys-color-surface);
      color: var(--md-sys-color-on-surface);
    }
    .logo {
      height: 40px;
      width: auto;
    }
    .nav-links {
      display: flex;
      gap: 8px;
    }
  `;

  @property({ type: String }) logoSrc = '/assets/logo/am-logo-round-grayscale.svg';

  render() {
    return html`
      <header class="header">
        <md-filled-icon-button>
          <md-icon>menu</md-icon>
        </md-filled-icon-button>
        
        <a href="/">
          <img src="${this.logoSrc}" alt="Home" class="logo">
        </a>
        
        <nav class="nav-links">
          <md-icon-button href="/contact">
            <md-icon>email</md-icon>
          </md-icon-button>
          <md-icon-button href="https://www.linkedin.com/in/aeronmiles/" target="_blank" rel="noopener">
            <md-icon>linkedin</md-icon>
          </md-icon-button>
          <md-icon-button href="https://github.com/aeronmiles" target="_blank" rel="noopener">
            <md-icon>github</md-icon>
          </md-icon-button>
        </nav>
      </header>
    `;
  }
}

@customElement('m-nav-button')
export class MNavButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
  `;

  @property({ type: String }) href = '';
  @property({ type: String }) icon = '';
  @property({ type: String }) label = '';

  render() {
    return html`
      <md-text-button href="${this.href}">
        ${this.icon ? html`<md-icon slot="icon">${this.icon}</md-icon>` : ''}
        ${this.label}
      </md-text-button>
    `;
  }
}