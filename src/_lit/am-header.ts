import { customElement, html, RootLitElement, origin } from './lit'
// import { isOverflown } from './util'
// import { when } from 'lit/directives/when.js';

@customElement('header-nav')
export class HeaderNav extends RootLitElement {
    render() {
        return html`
            <nav class="flex items-center justify-end">
                <a class="flex items-center justify-end w-11 h-11 link" aria-label="icons/email.svg profile link">
                    <img page="contact" src="${origin}/icons/email.svg" alt="contact" class="w-9 h-9">
                </a>
                <a target="_blank" rel="noopener" class="flex items-center justify-end w-11 h-11 link"
                    aria-label="icons/logo--linkedin.svg profile link" href="https://www.linkedin.com/in/aeronmiles/">
                    <img src="${origin}/icons/logo--linkedin.svg" alt="linkedin" class="w-9 h-9">
                </a>
                <a target="_blank" rel="noopener" class="flex items-center justify-end w-11 h-11 link"
                    aria-label="icons/logo--github.svg profile link" href="https://github.com/aeronmiles">
                    <img src="${origin}/icons/logo--github.svg" alt="github" class="w-9 h-9">
                </a>
            </nav>`
    }
}


@customElement('am-header')
export class Header extends RootLitElement {
    render() {
        return html`
            <header class="text-white z-40 gap-3 pr-scrollbar relative py-4 bounds">
                <div class="container flex items-center justify-between px-0">
                    <a class="w-11 sm:w-12 items-center link">
                        <span page="home" class="leading-none font-normal text-base tracking-wide6 hidden sm:block">
                            AERON<b page="home">MILES</b>
                        </span>
                        <span class="sm:hidden link">
                            <img page="home" src="${origin}/assets/logo/am-logo-round-grayscale.svg" alt="home" class="w-11 h-11">
                        </span>
                    </a>
                    <span class="absolute inset-y-0 left-1/2 transform -translate-x-1/2 hidden sm:block link">
                        <img page="home" src="${origin}/assets/logo/am-logo-round-grayscale.svg" alt="home" class="w-11 h-11">
                    </span>
                    <header-nav></header-nav>
                </div>
            </header>`
    }
}

