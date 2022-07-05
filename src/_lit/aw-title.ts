import { customElement, html, RootLitElement, property } from './lit'

@customElement('aw-title')
export class AwTitle extends RootLitElement {

    @property()
    title = ""
    @property()
    tag1 = ""
    @property()
    tag2 = ""
    
    render() {
        return html`<div class="text-center pt-11 pb-3 px-6">
                        <h1>${this.title}</h1>
                        <p class=" font-medium pt-2 mx-auto text-sm tracking-wide3">${this.tag1}</p>
                        <p class=" font-medium pb-2 mx-auto text-sm tracking-wide3">${this.tag2}</p>
                    </div>`

    }
}