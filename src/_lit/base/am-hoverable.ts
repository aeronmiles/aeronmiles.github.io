import { AMElement, Constructor } from './am-base';
import { PropertyDeclaration } from 'lit';

export interface IHoverable
{
  hovered: boolean;
}

export const Hoverable = <T extends Constructor<AMElement>>(Base: T) =>
{
  return class extends Base implements IHoverable
  {
    static properties: {
      hovered: PropertyDeclaration;
    } = {
        hovered: { type: Boolean, reflect: true },
      };

    hovered = false;

    constructor(...args: any[])
    {
      super(...args);
      this.addEventListener('mouseover', this.handleMosueOver);
      this.addEventListener('mouseout', this.handleMouseOut);
    }

    handleMosueOver() 
    {
      this.hovered = true;
      console.debug('Mouse over', this);
    }

    handleMouseOut()
    {
      this.hovered = false;
      console.debug('Mouse out', this);
    }

    disconnectedCallback()
    {
      super.disconnectedCallback();
      this.removeEventListener('mouseover', this.handleMosueOver);
      this.removeEventListener('mouseout', this.handleMouseOut);
    }
  };
};
