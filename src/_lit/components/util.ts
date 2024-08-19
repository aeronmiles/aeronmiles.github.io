export function isOverflown(element: HTMLElement | null)
{
    if (element == null) return false;
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}