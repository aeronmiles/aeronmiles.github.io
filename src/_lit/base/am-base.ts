// am-base.ts
import { LitElement, PropertyDeclaration } from "lit";
import { Util } from "./am-util";

const version = '0.1.0';

export class AMElement extends LitElement
{
  VERSION = version;

  static properties: {
    disabled: PropertyDeclaration;
    bubble: PropertyDeclaration
  } = {
      disabled: { type: Boolean, reflect: true },
      bubble: { type: Boolean, reflect: true },
    };

  set disabled(value: boolean)
  {
    const oldValue = this.disabled;
    if (value !== oldValue)
    {
      if (value)
      {
        this.classList.add('pointer-events-none');
      }
      else
      {
        this.classList.remove('pointer-events-none');
      }
      Util.logWithTrace(`AMElement :: disabled: ${value}`, this);
    }
  }

  get disabled(): boolean
  {
    return this.classList.contains('pointer-events-none');
  }

  constructor()
  {
    super();
  }

  createRenderRoot()
  {
    return this;
  }
}


export type Constructor<T = {}> = new (...args: any[]) => T;

export type AMElementConstructor = Constructor<AMElement> & typeof AMElement;

export type AMMixin<T extends AMElementConstructor, I> = (base: T) => Constructor<InstanceType<T> & I> & T;

// Helper type to convert a union type to an intersection type
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

// New type to represent the composed features
export type ComposedFeatures<M extends Array<AMMixin<any, any>>> =
  UnionToIntersection<InstanceType<ReturnType<M[number]>>>;

  
export function composeBehaviors<T extends Constructor<AMElement>>(
  BaseClass: T,
  ...behaviors: Array<object>
)
{
  return class extends BaseClass
  {
    constructor(...args: any[])
    {
      super(...args);
      behaviors.forEach(behavior => Object.assign(this, behavior));
    }
  };
}

// Modified composeFeatures function
export function composeClass<
  M extends Array<AMMixin<AMElementConstructor, any>>
>(...mixins: M)
{
  const mixin: AMMixin<AMElementConstructor, ComposedFeatures<M>> =
    (base: AMElementConstructor = AMElement) => mixins.reduce((acc, mixin) => mixin(acc as any), base) as any;

  return mixin(AMElement);
}

// Helper type to extract the instance type from a constructor
export type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : never;