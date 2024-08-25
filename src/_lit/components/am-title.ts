import { AMElement } from '../base';
import { customElement, property, html, unsafeHTML, when } from '../lit';

@customElement('am-title')
export class Title extends AMElement
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

  tag = (tag) => html`<h3 class="font-medium mx-auto text-base tracking-wide6 ">${tag}</h3>`

  formatTitle(title: string): string
  {
    return title.replace(/\#(.*?)\#/g, '<span class="font-mono font-thin rounded-sm border-centered pl-8 pr-3 mr-2 border-gray-700">$1</span>');
  }

  renderHeading = (content) =>
  {
    const formattedContent = this.formatTitle(content);
    switch (this.h)
    {
      case 1:
        return html`<h1>${unsafeHTML(formattedContent)}</h1>`;
      case 2:
        return html`<h2>${unsafeHTML(formattedContent)}</h2>`;
      case 3:
        return html`<h3>${unsafeHTML(formattedContent)}</h3>`;
      default:
        console.error(`Invalid heading level ${this.h}`);
        return html`<h1>${"Invalid heading level h : " + this.h}</h1>`;
    }
  }

  render()
  {
    // @TODO: Fix padding
    let p = 15 - (this.h * 2);
    return html`
                <div class="pt-${p + 1} pb-${p}">
                    ${when(this.title1, () => this.renderHeading(this.title1))}
                    ${when(this.title2, () => this.renderHeading(this.title2))}
                    ${when(this.tag1, () => this.tag(unsafeHTML(this.tag1)))}
                    ${when(this.tag2, () => this.tag(unsafeHTML(this.tag2)))}
                </div>`;
  }
}