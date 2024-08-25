import { AMElement } from '../base'
import { customElement, html } from '../lit'

@customElement('am-footer')
export class Footer extends AMElement {
    origin = ""
    date = 0
    constructor() {
        super()
        this.date = new Date().getFullYear()
    }
    render() {
        return html`
            <footer class="fixed bottom-0 w-full-scroll text-center bg-black">
                <div class="flex items-center justify-center space-x-1 my-1">
                    <a page="home" class="link">AERON<b page="home">MILES</b> | © ${this.date}</a>
                    
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


