import { customElement, html, property } from '../lit';
import { composeClass, Hoverable, Selectable } from '../base';


@customElement('am-button')
export class AmButton extends composeClass(Selectable, Hoverable)
{
  @property({ type: String })
  icon = '';
  @property({ type: String })
  label = 'Button';

  render()
  {
    return html`
      <button>
        ${this.label}
      </button>
    `;
  }
}