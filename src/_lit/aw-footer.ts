import { customElement, html, RootLitElement } from './lit'

@customElement('aw-footer')
export class Footer extends RootLitElement {
    origin = ""
    date = 0
    constructor()
    {
        super()
        this.date = new Date().getFullYear()
    }
    render() {
        return html`
            <footer class="fixed bottom-0 w-full-scroll m-auto text-center bg-white">
                <div class="flex items-center justify-center space-x-1 py-1">
                    <a page="aeronmiles" class="link">Aeron<b page="aeronmiles">Miles</b> | © ${this.date}</a>
                    <!-- <p>|</p>
                    <a target="_blank" rel="noopener" href="https://www.carbondesignsystem.com/">
                        <img src="${this.origin}/icons/carbon.svg" class="h-4">
                    </a>
                    <p>|</p>
                    <a target="_blank" rel="noopener" href="https://animejs.com/">
                        <img src="${this.origin}/icons/logo--animejs.svg" class="h-4">
                    </a>
                    <p>|</p>
                    <a target="_blank" rel="noopener" href="https://lit.dev/">
                        <img src="${this.origin}/icons/logo--lit.svg" class="h-4 filter-grayscale-100">
                    </a> -->
                </div>
            </footer>`
    }
}


