import { customElement, property, html, RootLitElement, origin } from './lit'
const mods = require('@data/vcvModules')

@customElement('vcv-module')
export class VcvModule extends RootLitElement {
    @property({ type: Number })
    focused = 0
    @property()
    over = 0
    @property()
    mod = { src: '', title: '', features: [], w: 0, h: 0 }

    constructor() {
        super()
        this.over = this.mod.title == "Strum" ? 1 : 0
    }

    s = () => this.over || !this.focused ? "" : "transform scale-95 filter-grayscale-100"
    c = () => this.over ? "" : "opacity-0 transform -translate-y-5"
    f = () => this.over ? 'bg-white ' : 'text-transparent transform translate-y-9'
    b = () => this.over ? "" : "border-opacity-0"

    feature = (f) => html`
    <div >
        <div class="inline-block transition duration-300 px-4 ${this.f()}">${f}</div>
    </div>`

    render() {
        return html`
        <img src="${origin}/icons/caret--down.svg" alt="arrow" class="relative w-8 h-8 mx-auto pb-4 transition duration-300 ${this.c()}">
        <div @mouseover="${() => this.over = 1}" @mouseout="${() => this.over = 0}"
        class="flex-row wrap space-y-12 items-start w-60 transition duration-200 ${this.s()}">
            <a href="#module_${this.mod.title}" class="text-sm">
                <div>
                    <img alt="${this.mod.title}" class="mx-auto p-3 border-gray-700 border ${this.b()}" src="${this.mod.src}"
                    style="width: ${this.mod.w + 24.44}px; height:${this.mod.h + 24.44}px;">
                </div>
                <div class="my-2">
                    <span class="${this.over ? "font-bold" : ""} text-white tracking-wide8 bg-black py-0_5 px-4">
                        ${this.mod.title}
                    </span>
                </div>
                ${this.mod.features.map(this.feature)}
            </a>
        </div>
        `
    }
}

@customElement('vcv-modules')
export class VcvModules extends RootLitElement {
    @property({ type: Number })
    over = 0

    mod = (m) => html`<vcv-module focused=${this.over} .mod=${m}></vcv-module>`

    render() {
        return html`
            <div @mouseover="${() => this.over = 1}" @mouseout="${() => this.over = 0}"
                class="flex-col-centered flex-wrap drop-shadow fadeIn-500 mx-32 gap-y-12">
                ${mods.map(this.mod)}
            </div>
            `
    }
}
