import { customElement, property, html, RootLitElement, origin } from './lit'
const mods = require('@data/works')

@customElement('am-carousel')
export class AMCarousel extends RootLitElement
{
    @property({ type: Number }) focused = 0;
    @property({ type: Number }) over = 0;
    @property({ type: Object }) mod = { src: '', title: '', features: [], w: 0, h: 0 };

    constructor()
    {
        super();
        this.over = this.mod.title === "Strum" ? 1 : 0;
    }

    getScaleClass = () => this.over || !this.focused ? "transform" : "transform filter-grayscale-100 opacity-50";

    getArrowClass = () => this.over ? "" : "opacity-0 transform -translate-y-5";

    getFeatureTextClass = () => this.over ? 'bg-white border border-black' : 'text-transparent';

    featureTemplate = (feature) => html`
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="inline-block text-black transition duration-300 px-4 py-1 w-36 ${this.getFeatureTextClass()}">${feature}</div>
            </div>`;

    render()
    {
        return html`
            <img src="${origin}/icons/caret--down.svg" alt="arrow" class="relative w-8 h-8 mx-auto pb-4 transition duration-300 ${this.getArrowClass()}">
            <div @mouseover="${() => this.over = 1}" @mouseout="${() => this.over = 0}"
            class="flex-row wrap space-y-12 items-start w-40 transition duration-400 ${this.getScaleClass()}">
                <a href="#module_${this.mod.title}" class="text-lg font-bold">
                    <div class="relative">
                        <img alt="${this.mod.title}" class="mx-auto p-4 border-gray-700 border" src="${this.mod.src}"
                        style="width: ${this.mod.w + 24.44}px; height:${this.mod.h + 24.44}px;">
                        ${this.mod.features.map(this.featureTemplate)}
                    </div>
                    <div class="my-2">
                        <span class="${this.over ? "font-bold" : ""} text-white tracking-wide8 bg-black py-0_5 px-4">
                            ${this.mod.title}
                        </span>
                    </div>
                </a>
            </div>`;
    }
}

@customElement('am-carousels')
export class AMCarousels extends RootLitElement
{
    @property({ type: Number }) over = 0;

    mod = (module) => html`<am-carousel focused=${this.over} .mod=${module}></am-carousel>`;

    render()
    {
        return html`
            <div @mouseover="${() => this.over = 1}" @mouseout="${() => this.over = 0}"
                class="flex-col-centered flex-wrap drop-shadow fadeIn-500 mx-32 gap-y-12">
                ${mods.map(this.mod)}
            </div>`;
    }
}