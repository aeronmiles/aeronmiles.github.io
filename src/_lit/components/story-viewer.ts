// story-card-viewer.ts

import { LitElement, html, css } from '../lit';
import { customElement } from 'lit/decorators.js';
import './story-card'; // Import the story-card component

@customElement('story-viewer')
export class StoryViewer extends LitElement
{

    static styles = css`
        .viewer {
            @apply p-4 grid grid-cols-1 gap-4;
        }
    `;

    render()
    {
        return html`
            <div class="viewer">
                <story-card 
                    title="Story 1" 
                    description="This is the description for story 1."
                    img="assets/img/audi1.jpg">
                </story-card>
            </div>
        `;
    }
}
