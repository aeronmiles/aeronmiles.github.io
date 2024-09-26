import { customElement, html, property } from '../lit';
import { composeClass, Hoverable, Selectable } from '../base';


@customElement('am-button')
export class AMButton extends composeClass(Selectable, Hoverable) {
  @property({ type: String })
  icon = '';

  @property({ type: String })
  label = 'Button';

  stateColor = () => this.hovered ? "bg-secondary-600" : this.selected ? " bg-secondary-800" : " bg-gray-950";

  render()
  {
    return html`
      <button class="w-full flex items-center justify-center mt-4 mb-4 px-4 py-2 rounded-md transition duration-300 ${this.stateColor()}">
        <span class="${this.hovered ? 'font-bold' : 'font-bold'} tracking-wide14">
          ${this.label}
        </span>
      </button>
    `;
  }
}