import { customElement, html, RootLitElement, property } from './lit';
import "./am-footer";
import "./components/content-loader";
import "./am-header";
import "./am-resume";

@customElement('am-main')
export class Main extends RootLitElement {
  @property() page = 0;
  @property() content = "";
  scrollHistory = [0];

  constructor() {
    super();
    this.addEventListener('click', this.onClick);
    this.addEventListener('mouseup', this.onMouse);
  }

  // Event listeners
  onMouse(e: MouseEvent) {
    if (e.button === 3) this.top();
  }

  onClick(e) {
    let shouldScrollTop = 1;
    switch (e.target.getAttribute('page')) {
      case null:
        shouldScrollTop = 0;
        break;
      case 'home':
        this.page = 0;
        break;
      case 'contact':
        this.page = 1;
        break;
      default:
        this.page = -1;
        break;
    }

    if (shouldScrollTop) this.top();
    if (e.target.href != null) this.scrollHistory.push(this.wrapper().scrollTop);
    this.content = this.page === 0 ? "work/index.html" : "blog/index.html";
  }

  // Helper methods
  wrapper = () => document.getElementsByClassName('wrapper')[0];
  top = () => this.wrapper().scrollTo(0, 0);

  // Render helpers
  main() {
    switch (this.page) {
      case 0: return this.landing();
      case 1: return this.contentLoader();
      default: return this._404();
    }
  }

  _404() {
    return html`<content-loader path="404.html"></content-loader>`;
  }

  landing() {
    return html`<am-resume></am-resume>`;
  }

  contentLoader() {
    return html`
      <am-title title="CONTACT" tag="Wolves hunt in packs for a reason"></am-title>
      <content-loader path="contact/index.html"></content-loader>
    `;
  }

  onLoadContent(_: Event) {
    // This method is currently throwing an error and not doing anything.
    // Consider implementing or removing it.
    throw new Error("Method not implemented.");
  }

  render() {
    return html`
      <div id="overlay" class="fixed wh-100 bg-black z-50 pointer-events-none fadeOut-500"></div>
      <am-header></am-header>
      <div class="wrapper">
        <main>
          <div id="mainView" class="pb-18">
            ${this.main()}
          </div>
        </main>
      </div>
      <am-footer></am-footer>
    `;
  }
}
