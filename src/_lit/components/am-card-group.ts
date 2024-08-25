import { css, customElement, html, property } from "../lit";
import { AMElement, AMItem } from "../base";
import { AmButton } from "./am-button";

const itemGroups = require('@data/works')

@customElement('am-card-item')
export class AMCardItem extends AmButton
{
  static styles = css`
    .card-image {
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }
    .card-image.active {
      opacity: 1;
    }
  `;

  @property({ type: Array }) itemGroup: AMItem[] = [];
  @property({ type: Number }) index = 0;

  private _currentItemIndex = 0;
  private _nextItemIndex = 1;
  private _intervalId;

  currentItem()
  {
    return this.itemGroup && this.itemGroup.length > 0 ? this.itemGroup[this._currentItemIndex] : null;
  }

  nextItem()
  {
    return this.itemGroup && this.itemGroup.length > 1 ? this.itemGroup[this._nextItemIndex] : null;
  }

  constructor()
  {
    super();
    this.startCycling();
  }

  connectedCallback()
  {
    super.connectedCallback();
    this.startCycling();
  }

  disconnectedCallback()
  {
    super.disconnectedCallback();
    this.stopCycling();
  }

  startCycling()
  {
    if (this.itemGroup && this.itemGroup.length > 1)
    {
      this._intervalId = setInterval(() =>
      {
        this._currentItemIndex = this._nextItemIndex;
        this._nextItemIndex = (this._nextItemIndex + 1) % this.itemGroup.length;
        this.requestUpdate();
      }, 3000); // Change item every 5 seconds
    }
  }

  stopCycling()
  {
    if (this._intervalId)
    {
      clearInterval(this._intervalId);
    }
  }

  getScaleClass = () => this.hovered ? "scale-105" : "filter-grayscale-50";

  getArrowClass = () => this.hovered ? "" : "opacity-0 transform -translate-y-5";

  getFeatureTextClass = () => this.hovered ? 'bg-white border-black' : 'border-transparent text-transparent';

  featureTemplate = (feature) => html`
    <div class="absolute font-bold inset-x-0 bottom-0 flex items-center justify-center">
      <div class="inline-block text-black transition duration-300 w-40 py-6 rounded-md ${this.getFeatureTextClass()}">${feature}</div>
    </div>`;

  render()
  {
    const currentItem = this.currentItem();
    const nextItem = this.nextItem();

    if (!currentItem)
    {
      return html`<div>No items available</div>`;
    }

    return html`
    <div @click="${() => { this.dispatchEvent(new CustomEvent('item-selected', { detail: this.index, bubbles: true, composed: true })); }}"
         class="flex-row wrap text-sm items-start w-40 transition duration-400 ${this.getScaleClass()}">
      <a href="#item_${currentItem.title}" class="uppercase">
        <div class="relative">
          <img 
            id="currentImage"
            alt="${currentItem.title}" 
            class="mx-auto border-gray-700 border rounded-md card-image active ${this.itemGroup.length > 1 ? "absolute" : ""}" 
            style="
              width: ${this.hovered ? (currentItem.w + 24.44) : (currentItem.w + 24.44)}px; 
              height: ${currentItem.h + 24.44}px;
            " 
            src="${currentItem.src}"
          >
          ${nextItem ? html`
            <img 
              id="nextImage"
              alt="${nextItem.title}" 
              class="mx-auto border-gray-700 border rounded-md card-image" 
              style="
                width: ${this.hovered ? (nextItem.w + 24.44) : (nextItem.w + 24.44)}px; 
                height: ${nextItem.h + 24.44}px;
              " 
              src="${nextItem.src}"
            >
          ` : ''}
          ${currentItem.features.map(this.featureTemplate)}
        </div>
        <div class="mt-4 mb-4 pl-4 pt-1 pb-2 rounded-md ${this.hovered || this.selected ? " bg-secondary-600" : "bg-gray-950 "}">
          <span class=" ${this.hovered ? "font-bold" : "font-bold"} tracking-wide14">
            ${currentItem.title}
          </span>
        </div>
      </a>
    </div>`;
  }
}

@customElement('am-card-group')
export class AMCardGroup extends AMElement
{
  @property({ type: Number }) selectedIndex = -1;

  itemGroup = (itemGroup, index) => html`
  <am-card-item 
    .itemGroup=${itemGroup} 
    .index=${index}
    .selected=${this.selectedIndex === index}
    @item-selected=${this.handleItemSelected}
  ></am-card-item>`;

  handleItemSelected(event)
  {
    this.selectedIndex = event.detail;
  }

  render()
  {
    return html`
      <div class="flex-col-centered flex-wrap drop-shadow  In-500">
        ${itemGroups.map(this.itemGroup)}
      </div>`;
  }
}