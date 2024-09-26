import { AMElement, Constructor } from './am-base';
import { Util } from './am-util';


export interface IClickable
{
  handleClick: (event: MouseEvent) => void;
}


export const Clickable = <T extends Constructor<AMElement>>(Base: T) =>
{
  return class extends Base implements IClickable
  {
    constructor(...args: any[])
    {
      super(...args);
      this.addEventListener('click', this.handleClick);
    }

    handleClick(event: MouseEvent)
    {
      this.dispatchEvent(
        new CustomEvent('item-clicked', {
          bubbles: false,
          composed: true,
          detail: { originalEvent: event },
        })
      );
      Util.logWithTrace('Clicakable :: clicked', this);
    }

    disconnectedCallback()
    {
      super.disconnectedCallback();
      this.removeEventListener('click', this.handleClick);
    }
  };
};
