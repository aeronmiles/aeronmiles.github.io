import 'reflect-metadata';


type Constructor<T = any> = new (...args: any[]) => T;


class DependencyInjectionContainer {
  private readonly instances = new Map<Constructor<any>, any>();

  register<T>(constructor: Constructor<T>, instance?: T): void {
    if (instance) {
      this.instances.set(constructor, instance);
    }
  }

  resolve<T>(constructor: Constructor<T>): T {
    if (!this.instances.has(constructor)) {
      const instance = this.createInstance(constructor);
      this.instances.set(constructor, instance);
    }
    return this.instances.get(constructor);
  }

  private createInstance<T>(constructor: Constructor<T>): T {
    const paramTypes: Constructor[] = Reflect.getMetadata('design:paramtypes', constructor) || [];
    const injections = paramTypes.map(type => this.resolve(type));
    return new constructor(...injections);
  }
}

// Decorator for injectable classes
export function Injectable() {
  return function (_target: Constructor) {
    // This is just a marker decorator, no implementation needed
  };
}

// Set up the container
export const DI = new DependencyInjectionContainer();