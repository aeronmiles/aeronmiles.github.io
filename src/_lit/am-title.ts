import { customElement, html, RootLitElement, property } from './lit'
import { when } from 'lit/directives/when.js';

@customElement('am-title')
export class Title extends RootLitElement
{
    @property()
    title1 = ""

    @property()
    title2 = ""

    @property()
    tag1 = ""

    @property()
    tag2 = ""

    @property({ type: Number })
    h = 1  // Default to h1

    tag = (tag) => html`<p class="font-light mx-auto text-base">${tag}</p>`

    renderHeading = (content) =>
{
        switch (this.h)
        {
            case 1:
                return html`<h1>${content}</h1>`;
            case 2:
                return html`<h2>${content}</h2>`;
            case 3:
                return html`<h3>${content}</h3>`;
            default:
                console.error(`Invalid heading level ${this.h}`);
                return html`<h1>${"Invalid heading level h : " + this.h}</h1>`;
        }
    }

    render()
    {
        var p = 14 - (this.h * 2);
        return html`
                <div class="py-${p}">
                    ${when(this.title1, () => this.renderHeading(this.title1))}
                    ${when(this.title2, () => this.renderHeading(this.title2))}
                    ${when(this.tag1, () => this.tag(this.tag1))}
                    ${when(this.tag2, () => this.tag(this.tag2))}
                </div>`;

    }
}
