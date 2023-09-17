import { LitElement, html, css, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, state } from 'lit/decorators';

// Gesture control
import 'hammerjs';

@customElement('story-viewer')
export class StoryViewer extends LitElement
{

    @state() private _index: number = 0;
    get index()
    {
        return this._index;
    }
    set index(value: number)
    {
        this.children[this._index].dispatchEvent(new CustomEvent('exited'));
        this.children[value].dispatchEvent(new CustomEvent('entered'));
        this._index = value;
    }

    @state() private _panData: { isFinal?: boolean, deltaX?: number } = {};

    constructor()
    {
        super();
        new Hammer(this).on('pan', (e: HammerInput) => this._panData = e);
        this.index = 0;
    }

    firstUpdated()
    {
        this.children[this._index].dispatchEvent(new CustomEvent('entered'));
    }

    update(changedProperties: PropertyValues)
    {
        let { deltaX = 0, isFinal = false } = this._panData;

        if (!changedProperties.has("_index") && isFinal)
        {
            deltaX > 0 ? this.previous() : this.next();
        }

        const width = this.clientWidth;
        const minScale = 0.8;
        deltaX = (isFinal ? 0 : deltaX);

        Array.from(this.children).forEach((el: Element, i) =>
        {
            const x = (i - this.index) * width + deltaX;
            const u = deltaX / width + (i - this.index);
            const v = -Math.abs(u * (1 - minScale)) + 1;
            const scale = Math.max(v, minScale);

            (el as HTMLElement).style.transform = `translate3d(${x}px,0,0) scale(${scale})`;
        })

        super.update(changedProperties);
    }

    next()
    {
        this.index = Math.max(0, Math.min(this.children.length - 1, this.index + 1));
    }

    previous()
    {
        this.index = Math.max(0, Math.min(this.children.length - 1, this.index - 1));
    }

    static styles = css`
    :host {
      @apply block relative items-center w-72 h-[800px];
    }
    ::slotted(*) {
      @apply absolute w-full h-[calc(100%-20px)] transition-transform duration-300 ease-out;
    }

    svg {
      @apply absolute top-[calc(50%-25px)] h-12 cursor-pointer;
    }
    #next {
      @apply absolute right-0;
    }

    #progress {
      @apply relative top-[calc(100%-20px)] h-5 w-1/2 mx-auto grid gap-2.5 align-center;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
    }
    #progress > div {
      @apply h-1 bg-gray-500 transition-colors duration-300 linear cursor-pointer;
    }
    #progress > div.watched {
      @apply bg-white;
    }`;

    render()
    {
        return html`
      <slot></slot>

      <svg id="prev" viewBox="0 0 10 10" @click=${() => this.previous()}>
        <path d="M 6 2 L 4 5 L 6 8" stroke="#fff" fill="none" />
      </svg>
      <svg id="next" viewBox="0 0 10 10" @click=${() => this.next()}>
        <path d="M 4 2 L 6 5 L 4 8" stroke="#fff" fill="none" />
      </svg>
      
      <div id="progress">
        ${Array.from(this.children).map((_, i) => html`
          <div
            class=${classMap({ watched: i <= this.index })}
            @click=${() => this.index = i}
          ></div>`
        )}
      </div>
    `;
    }
}
