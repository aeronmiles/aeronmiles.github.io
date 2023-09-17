import { LitElement, html, css, } from 'lit';
import { customElement, query } from 'lit/decorators';

@customElement("story-card")
export class StoryCard extends LitElement {
    constructor() {
        super();

        this.addEventListener("entered", () => {
            if (this._slottedMedia) {
                this._slottedMedia.currentTime = 0;
                this._slottedMedia.play();
            }
        });

        this.addEventListener("exited", () => {
            if (this._slottedMedia) {
                this._slottedMedia.pause();
            }
        });
    }

    static styles = css`
        #media {
            @apply h-full;
        }
  
        #media ::slotted(*) {
            @apply w-full h-full object-cover;
        }
  
        #content {
            @apply absolute inset-0 p-12 font-sans text-white text-2xl;
        }
  
        #content > slot::slotted(*) {
            @apply m-0;
        }
    `;

    private get _slottedMedia(): HTMLMediaElement | null {
        const el = this._mediaSlot?.assignedNodes()[0];
        return el instanceof HTMLMediaElement ? el : null;
    }

    @query("slot[name=media]")
    private _mediaSlot!: HTMLSlotElement;

    render() {
        return html`
            <div id="media">
                <slot name="media"></slot>
            </div>
            <div id="content">
                <slot></slot>
            </div>
        `;
    }
}
