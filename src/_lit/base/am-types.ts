export class AMItem
{
  title: string;
  src: string;
  w: string;
  h: string;
  features: string[];

  constructor(title: string, src: string, w: string, h: string, features: string[])
  {
    this.title = title;
    this.src = src;
    this.w = w;
    this.h = h;
    this.features = features;
  }
}