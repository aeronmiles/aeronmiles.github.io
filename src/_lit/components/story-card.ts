// story-card.ts

import { LitElement, html, property } from '../lit';
import { customElement } from 'lit/decorators.js';

@customElement('story-card')
export class StoryCard extends LitElement {
    @property({ type: String }) title: string = '';
    @property({ type: String }) description: string = '';
    @property({ type: String }) img: string = '';

    render() {
        return html`
            <div class="p-4 border rounded- shadow-md relative overflow-hidden">
                <img class="absolute top-0 left-0 w-full h-full object-cover z-0" src="${this.img}" />
                <div class="absolute inset-0 bg-black bg-opacity-50 z-10 flex flex-col justify-center items-center">
                    <div class="text-xl font-semibold mb-2">${this.title}</div>
                    <div class="text-sm">${this.description}</div>
                </div>
            </div>
        `;
    }
}
