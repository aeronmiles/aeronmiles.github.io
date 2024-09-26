import { AMElement, Constructor } from './am-base';
import { PropertyDeclaration } from 'lit';
import { Util } from './am-util';


export interface IDraggable
{
  dragged: boolean;
  handleDrag: (event: MouseEvent) => void;
  resetDragState: () => void;
}


export const Draggable = <T extends Constructor<AMElement>>(Base: T) =>
{
  return class extends Base implements IDraggable
  {
    static properties: {
      dragged: PropertyDeclaration;
    } = {
        dragged: { type: Boolean, reflect: true }
      };

    dragged = false;

    handleDrag(event: MouseEvent)
    {
      this.dragged = true;
      this.dispatchEvent(new CustomEvent('item-dragged', {
        bubbles: false,
        composed: true,
        detail: { originalEvent: event }
      }));
      Util.logWithTrace('Draggable :: dragged', this);
    }

    resetDragState()
    {
      this.dragged = false;
    }

    constructor(...args: any[])
    {
      super(...args);
      this.addEventListener('drag', this.handleDrag);
    }

    disconnectedCallback()
    {
      super.disconnectedCallback();
      this.removeEventListener('drag', this.handleDrag);
    }
  };
};