import { customElement, html, RootLitElement, property } from './lit'
import "./am-footer";
import "./content-loader";
import "./am-header";
import "./am-resume";

@customElement('am-main')
export class Main extends RootLitElement {

  @property()
  page = 0

  @property()
  content = ""

  scrollHistory = [0]

  wrapper = () => document.getElementsByClassName('wrapper')[0]

  constructor() {
    super()
    this.addEventListener('click', this.onClick)
    this.addEventListener('mouseup', this.onMouse)
    // const le = new Event('load-content')
    // document.addEventListener('load-content', this.onLoadContent)
  }

  onMouse(e) {
    switch (e.button) {
      case 3: this.top();
    }
  }

  onLoadContent(e) {
    throw new Error("Method not implemented.");
    e
  }

  onClick(e) {
    let s = 1
    switch (e.target.getAttribute('page')) {
      case null: s = 0; break
      case 'home': this.page = 0; break
      case 'contact': this.page = 1; break;
      default: this.page = -1; break
    }
    if (s) this.top()
    if (e.target.href != null) this.scrollHistory.push(this.wrapper().scrollTop)
    this.content = this.page == 0 ? "work/index.html" : "blog/index.html"
  }

  top() { this.wrapper().scrollTo(0, 0) }

  render() {
    return html`
    <div id="overlay" class="fixed wh-100 bg-black z-50 pointer-events-none fadeOut-500"></div>
    <am-header></am-header>
    <div class="wrapper ">
      <main>
        <!-- <div class="parallax-group parallax-layer -translate-z-1 flex items-center justify-center">
            </div> -->
        <div id="mainView" class="pb-8">
          ${this.main()}
        </div>
      </main>
    </div>
    <am-footer></am-footer>
      `
  }

  main = () => {
    switch (this.page) {
      case 0: return this.landing()
      case 1: return this.contentLoader()
      default: return this._404()
    }
  }

  _404 = () => html`<content-loader path="404.html"></content-loader>`

  landing = () => html`
      <am-resume></am-resume>
    `

  contentLoader = () => html`
    <am-title title="CONTACT" tag="Wolves hunt in packs for a reason"></am-title>
    <content-loader path="contact/index.html"></content-loader>
    `
}