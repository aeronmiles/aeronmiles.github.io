import { customElement, html, RootLitElement, origin } from './lit'

@customElement('aw-header-nav')
export class HeaderNav extends RootLitElement {
    constructor() {
        super()
    }
    render() {
        return html`
            <nav class="flex justify-end space-x-3 text-right tracking-wide6 w-32 sm:w-52">
                <a class="flex items-center justify-end w-8 h-8 link" aria-label="icons/email.svg profile link">
                    <img page="contact" src="${origin}/icons/email.svg" alt="contact" class="w-5_5 h-5_5">
                </a>
                <a target="_blank" rel="noopener" class="flex items-center justify-end w-8 h-8 link"
                    aria-label="icons/logo--linkedin.svg profile link" href="https://www.linkedin.com/in/aeronmiles/">
                    <img src="${origin}/icons/logo--linkedin.svg" alt="linkedin" class="w-5_5 h-5_5">
                </a>
                <a target="_blank" rel="noopener" class="flex items-center justify-end w-8 h-8 link"
                    aria-label="icons/logo--github.svg profile link" href="https://github.com/aeronmiles">
                    <img src="${origin}/icons/logo--github.svg" alt="github" class="w-5_5 h-5_5">
                </a>
            </nav>`
    }
}

@customElement('aw-header')
export class Header extends RootLitElement {
    render() {
        return html`
            <header class="bg-white text-gray-900 z-40 gap-4">
                <div class="container flex justify-between items-center py-2 max-w-6xl">
                    <a class="w-32 sm:w-52 items-center link">
                        <span page="aeronmiles" class="leading-none font-normal text-base tracking-wide9 hidden sm:block">
                            AERON<b page="aeronmiles">MILES</b>
                        </span>
                        <span class="transform scale-100 h-px40 sm:hidden link">
                            <img page="aeronmiles" src="${origin}/assets/logo/am-logo-round.svg" alt="aeronmiles" class="w-9 h-9">
                        </span>
                    </a>
                    <span class="transform scale-100 h-px40 hidden sm:block link">
                        <img page="aeronmiles" src="${origin}/assets/logo/am-logo-round.svg" alt="aeronmiles" class="w-9 h-9">
                    </span>
                    <aw-header-nav></aw-header-nav>
                </div>
            </header>`
    }
}



