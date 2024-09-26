import { customElement, html } from './lit';
import './components';
import { AMElement } from './base';
import "./components/am-button";
import "./components/am-console";
import "./components/gl-canvas";
import "./components/am-media-pipe";
import "./components/github-repos";
import "@material/web/all.js";


@customElement('m-resume')
export class MResume extends AMElement
{
  constructor()
  {
    super();
  }

  loadContent = (index) =>
  {
    switch (index)
    {
      case 0:
        return html`<am-content-loader path="blog.html"></am-content-loader>`;
      case 1:
        return html`<am-content-loader path="404.html"></am-content-loader>`;
      default:
        return html`<am-content-loader path="404.html"></am-content-loader>`;
    }
  }

  render()
  {
    return html`
    <div class="bounds">
      </label>
      <div class="mb-6 sm:mt-2 md:mt-12 lg:mt-12">
        <am-title h=1 title1="TECHNICAL #ART# DIRECTOR" title2="" tag1="" tag2=""></am-title>
      </div>
      <div class="mb-10">
        <p class="tracking-normal">Merging technology and art to realize creative visions through innovative hardware, software and ai solutions.</p>
      </div>
        <am-card-group .showImages=${false} @item-selected=${(e) => this.loadContent(e.detail)} class="px-8"></am-card-group>
      <div class="">
        <am-title h=3 title1="ABOUT" title2="" tag1="" tag2="" class=""></am-title>
          <p>As an award winning technical art director, I leverage cutting-edge hardware and software solutions to bring
            innovative ideas to life. My expertise includes:</p>
      </div>
    </div>`
  }
}