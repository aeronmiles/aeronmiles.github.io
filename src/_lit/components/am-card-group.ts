import { css, customElement, html, property } from "../lit";
import { AMElement, AMItem, composeClass, Hoverable, Selectable, } from "../base";
import { Util } from "../base/am-util";
const itemGroups = require('@data/works');
import '@material/web/all.js';


@customElement('am-card-item')
export class AMCardItem extends composeClass(Selectable, Hoverable)
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

  @property({ type: Boolean }) showImages = true;
  @property({ type: Array }) itemGroup: AMItem[] = [];
  @property({ type: Number }) index = 0;

  private _currentItemIndex = 0;
  private _nextItemIndex = 1;
  private _intervalId;

  constructor()
  {
    super();
    this.startCycling();
  }

  currentItem()
  {
    return this.itemGroup && this.itemGroup.length > 0 ? this.itemGroup[this._currentItemIndex] : null;
  }

  nextItem()
  {
    return this.itemGroup && this.itemGroup.length > 1 ? this.itemGroup[this._nextItemIndex] : null;
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

  getFeatureTextClass = () => this.hovered ? 'bg-gray-200 border-black border border-gray-700' : 'border-transparent text-transparent';

  featureTemplate = (feature) => html`
    <div class="m-2 absolute font-bold inset-x-0 bottom-0 flex-center">
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
    <div class="flex-row wrap text-sm items-start w-40 transition duration-400  transform hover:scale-105 active:scale-95">
      <a href="#item_${currentItem.title}" class="uppercase">
        <div class="relative ${this.showImages ? "" : "hidden"}">
          <img 
            id="currentImage"
            alt="${currentItem.title}" 
            class="mx-auto border-gray-700 border rounded-md card-image active ${this.itemGroup.length > 1 ? "absolute" : ""}" 
            style="
              width: ${currentItem.w}; 
              height: ${currentItem.h};
            " 
            src="${currentItem.src}"
          >
          ${nextItem ? html`
            <img 
              id="nextImage"
              alt="${nextItem.title}" 
              class="mx-auto border-gray-700 border rounded-md card-image" 
              style="
                width: ${nextItem.w}; 
                height: ${nextItem.h};
              " 
              src="${nextItem.src}"
            >
          ` : ''}
          ${currentItem.features.map(this.featureTemplate)}
        </div>
        <am-button disabled=${true} .label=${currentItem.title} .selected=${this.selected} .hovered=${this.hovered}></am-button>
      </a>
    </div>`;
  }
}


@customElement('am-card-group')
export class AMCardGroup extends AMElement
{
  @property({ type: Boolean }) showImages = true;
  @property({ type: Number }) selectedIndex = -1;

  itemGroup = (itemGroup, index) => html`
  <am-card-item 
    .showImages=${this.showImages}
    .itemGroup=${itemGroup} 
    .index=${index}
    .selected=${this.selectedIndex === index}
    @am-selected=${this.handleItemSelected}
  ></am-card-item>`;

  handleItemSelected(event)
  {
    this.selectedIndex = event.detail.index;
    Util.logWithTrace(`AMCardGroup :: item selected index: ${this.selectedIndex}`, event.detail)
  }

  render()
  {
    return html`
      <div class="flex-col-center flex-wrap drop-shadow  In-500">
        ${itemGroups.map(this.itemGroup)}
      </div>`;
  }
}