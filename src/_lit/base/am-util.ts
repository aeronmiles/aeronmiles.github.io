import { LitElement } from "lit";

export class Util
{
  static isOverflown(element: HTMLElement | null)
  {
    if (element == null) return false;
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  static getCallerInfo(caller: object): string
  {
    if (caller instanceof LitElement)
    {
      return `${caller.constructor.name} (${caller.tagName.toLowerCase()})`;
    } else if (caller && typeof caller === 'object' && 'constructor' in caller)
    {
      return caller.constructor.name;
    } else
    {
      return 'Unknown';
    }
  }

  static getStackTrace(): string
  {
    const error = new Error();
    return error.stack?.split('\n').slice(3).join('\n') || 'Stack trace unavailable';
  }

  static logWithTrace(message: string, caller: object): void
  {
    console.groupCollapsed(message);
    console.debug('Caller:', caller);
    console.groupCollapsed('Stack Trace:');
    console.debug(Util.getStackTrace());
    console.groupEnd();
    console.groupEnd();
  }
}