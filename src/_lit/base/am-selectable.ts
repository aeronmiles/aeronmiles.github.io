import { PropertyDeclaration } from 'lit';
import { AMElement, Constructor } from './am-base';


export interface ISelectable {
  selected: boolean;
  select(): void;
  deselect(): void;
  isSelected: boolean;
}


export const Selectable = <T extends Constructor<AMElement>>(Base: T) =>
  class extends Base implements ISelectable {
    static properties: {
      selected: PropertyDeclaration;
    } = {
      selected: { type: Boolean, reflect: true }
    };

    selected = false;

    constructor(...args: any[]) {
      super(...args);
      this.addEventListener('click', this.select);
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      this.removeEventListener('click', this.select);
    }

    select(this: HTMLElement & ISelectable) {
      this.selected = true;
      this.dispatchEvent(new CustomEvent('selected', { bubbles: true, composed: true }));
      console.debug('Item selected', this);
    }

    deselect(this: HTMLElement & ISelectable) {
      this.selected = false;
      this.dispatchEvent(new CustomEvent('deselected', { bubbles: true, composed: true }));
      console.debug('Item deselected', this);
    }

    get isSelected() {
      return this.selected;
    }
  };