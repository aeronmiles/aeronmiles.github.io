import { PropertyDeclaration } from 'lit';
import { AMElement, Constructor } from './am-base';
import { Util } from './am-util';

export interface ISelectable {
  selected: boolean;
  isSelected: boolean;
}

export const Selectable = <T extends Constructor<AMElement>>(Base: T) =>
  class extends Base implements ISelectable {
    static properties: {
      selected: PropertyDeclaration;
    } = {
      selected: { type: Boolean, reflect: true }
    };

    private _selected = false;

    constructor(...args: any[]) {
      super(...args);
      this.addEventListener('click', this.handleClick);
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      this.removeEventListener('click', this.handleClick);
    }

    private handleClick = () => {
      this.selected = true;
    }

    get selected(): boolean {
      return this._selected;
    }

    set selected(value: boolean) {
      const oldValue = this._selected;
      this._selected = value;
      
      if (oldValue !== value) {
        this.requestUpdate('selected', oldValue);
        if (value) {
          this.dispatchEvent(new CustomEvent('am-selected', { bubbles: false, composed: true, detail: this }));
          Util.logWithTrace('Selectable :: selected', this);
        } else {
          this.dispatchEvent(new CustomEvent('am-deselected', { bubbles: false, composed: true, detail: this }));
          Util.logWithTrace('Selectable :: deselected', this);
        }
      }
    }

    get isSelected(): boolean {
      return this.selected;
    }
  };