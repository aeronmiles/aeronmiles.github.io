import { customElement, html, RootLitElement, property } from './lit'
import { when } from 'lit/directives/when.js';

@customElement('am-title')
export class Title extends RootLitElement {

    @property()
    title1 = ""
    @property()
    title2 = ""
    @property()
    tag1 = ""
    @property()
    tag2 = ""

    tag = (tag) => html`<p class="font-medium mx-auto text-base">${tag}</p>`

    render() {
        return html`<div class="pt-9 pb-3">
    <h1>${this.title1}</h1>
    <h1 class="pb-3">${this.title2}</h1>
    ${when(this.tag1, () => this.tag(this.tag1))}
    ${when(this.tag2, () => this.tag(this.tag2))}
</div>`
    }
}

@customElement('am-title2')
export class Title2 extends RootLitElement {

    @property()
    title1
    @property()
    title2 = ""
    @property()
    tag1 = ""
    @property()
    tag2 = ""

    tag = (tag) => html`<p class="font-medium mx-auto text-sm>${tag}</p>`

    render() {
        return html`<div class="pt-9 pb-1">
    <h2>${this.title1}</h2>
    <h2 class="pb-3">${this.title2}</h2>
    ${when(this.tag1, () => this.tag(this.tag1))}
    ${when(this.tag2, () => this.tag(this.tag2))}
</div>`
    }
}