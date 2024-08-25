export class AMItem
{
  title: string;
  src: string;
  w: number;
  h: number;
  features: string[];

  constructor(title: string, src: string, w: number, h: number, features: string[])
  {
    this.title = title;
    this.src = src;
    this.w = w;
    this.h = h;
    this.features = features;
  }
}