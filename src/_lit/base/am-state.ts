import { LitElement } from 'lit';
import { Util } from './am-util';

type Subscriber<T> = (value: T) => void;

export class StateManager
{
  private state: Map<string, any> = new Map();
  private subscribers: Map<string, Set<Subscriber<any>>> = new Map();
  private namespace: string;

  constructor (namespace: string)
  {
    this.namespace = namespace;
  }

  getState<T>(key: string): T
  {
    return this.state.get(key);
  }

  setState<T>(key: string, value: T, caller: object): void
  {
    this.state.set(key, value);
    this.notifySubscribers(key, value);
    Util.logWithTrace(`StateManager :: ${this.namespace} State Change: ${key} ${value}`, caller)
  }

  subscribe<T>(key: string, callback: Subscriber<T>): () => void
  {
    if (!this.subscribers.has(key))
    {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key)!.add(callback);

    return () =>
    {
      const subscribers = this.subscribers.get(key);
      if (subscribers)
      {
        subscribers.delete(callback);
      }
    };
  }

  private notifySubscribers<T>(key: string, value: T): void
  {
    const subscribers = this.subscribers.get(key);
    if (subscribers)
    {
      subscribers.forEach(callback => callback(value));
    }
  }
}

class StateManagerRegistry
{
  private static instance: StateManagerRegistry;
  private managers: Map<string, StateManager> = new Map();

  private constructor() { }

  static getInstance(): StateManagerRegistry
  {
    if (!StateManagerRegistry.instance)
    {
      StateManagerRegistry.instance = new StateManagerRegistry();
    }
    return StateManagerRegistry.instance;
  }

  getManager(namespace: string): StateManager
  {
    if (!this.managers.has(namespace))
    {
      this.managers.set(namespace, new StateManager(namespace));
    }
    return this.managers.get(namespace)!;
  }
}

export function getStateManager(managerName: string)
{
  return {
    property<T>(stateKey?: string): PropertyDecorator
    {
      return (target: Object, propertyKey: string | symbol) =>
      {
        const registry = StateManagerRegistry.getInstance();
        const stateManager = registry.getManager(managerName);

        const key = stateKey || String(propertyKey);

        if (stateManager.getState(key) === undefined)
        {
          stateManager.setState(key, (target as any)[propertyKey], target);
        }

        Object.defineProperty(target, propertyKey, {
          get(): T
          {
            return stateManager.getState<T>(key);
          },
          set(value: T)
          {
            stateManager.setState<T>(key, value, this);
          },
          configurable: true,
          enumerable: true,
        });

        if (target instanceof LitElement)
        {
          const originalConnectedCallback = target.connectedCallback || (() => { });
          target.connectedCallback = function (this: LitElement)
          {
            originalConnectedCallback.call(this);
            const unsubscribe = stateManager.subscribe<T>(key, () =>
            {
              this.requestUpdate();
            });

            if (!this.hasOwnProperty('__stateUnsubscribers'))
            {
              Object.defineProperty(this, '__stateUnsubscribers', {
                value: new Map<string, Set<() => void>>(),
                writable: false,
                configurable: false,
              });
            }
            if (!(this as any).__stateUnsubscribers.has(managerName))
            {
              (this as any).__stateUnsubscribers.set(managerName, new Set<() => void>());
            }
            (this as any).__stateUnsubscribers.get(managerName).add(unsubscribe);
          };

          const originalDisconnectedCallback = target.disconnectedCallback || (() => { });
          target.disconnectedCallback = function (this: LitElement)
          {
            originalDisconnectedCallback.call(this);
            (this as any).__stateUnsubscribers?.get(managerName)?.forEach((unsubscribe: () => void) => unsubscribe());
            (this as any).__stateUnsubscribers?.get(managerName)?.clear();
          };
        }
      };
    },
  };
}

export class State 
{
  static get GLOBAL() { return getStateManager('GLOBAL'); }

  static namespace(namespace: string) { return getStateManager(namespace); }
}