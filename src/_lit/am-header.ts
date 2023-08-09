import { customElement, html, RootLitElement, origin } from './lit'
// import { isOverflown } from './util'
// import { when } from 'lit/directives/when.js';

@customElement('header-nav')
export class HeaderNav extends RootLitElement {
    render() {
        return html`
            <nav class="flex justify-end space-x-3 text-right w-32 sm:w-52">
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

@customElement('am-header')
export class Header extends RootLitElement {
    render() {
        return html`
            <header class="text-white z-40 gap-4 pr-scrollbar" style="padding-right: var(--scrollbar-width)">
                <div class="container flex justify-between py-3 max-w-6xl m-auto px-6 sm:px-12 md:px-24 lg:px-40">
                    <a class="w-32 sm:w-52 items-center link">
                        <span page="home" class="leading-none font-normal text-base tracking-wide6 hidden sm:block">
                            AERON<b page="home">MILES</b>
                        </span>
                        <span class="transform scale-100 h-px40 sm:hidden link">
                            <img page="home" src="${origin}/assets/logo/am-logo-round-grayscale.svg" alt="home" class="w-9 h-9">
                        </span>
                    </a>
                    <span class="transform scale-100 h-px40 hidden sm:block link">
                        <img page="home" src="${origin}/assets/logo/am-logo-round-grayscale.svg" alt="home" class="w-9 h-9">
                    </span>
                    <header-nav></header-nav>
                </div>
            </header>`
    }
}



