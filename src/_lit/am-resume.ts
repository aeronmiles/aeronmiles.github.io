import { customElement, html } from './lit';
import './components';
import { AMElement } from './base';
import "./components/am-button";
import "./components/am-console";


@customElement('am-resume')
export class Resume extends AMElement
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
      <!-- <am-console-prompt></am-console-prompt> -->
      <!-- <am-ascii-am></am-ascii-am> -->
      <!-- <am-ascii-wolf></am-ascii-wolf> -->
      <!-- <am-button></am-button> -->
      <div class="sm:mt-2 md:mt-12 lg:mt-12">
        <am-title h=1 title1="TECHNICAL #ART# DIRECTOR" title2="" tag1="" tag2=""></am-title>
      </div>
      <div class="">
        <p class="tracking-normal">Merging technology and art to realize creative visions through innovative hardware, software and ai solutions</p>
      </div>
      <am-card-group @item-selected=${(e) => this.loadContent(e.detail)} class="px-8"></am-card-group>
      <div class="mt-10 text-md">
        <!-- <img class="max-w-xl rounded-lg border border-gray-700" src="assets/img/vitiligo-katie-hero.png" alt=""> -->
        <div class="mt-10">
          <p>As an award winning technical art director, I leverage cutting-edge hardware and software solutions to bring
            innovative ideas to life. My expertise includes:</p>

          <!-- Option 2: Using paragraph elements -->
          <p class="mt-10">• Integrating novel hardware components like LiDAR cameras</p>
          <p class="">• Implementing AI computer vision solutions for component identification</p>
          <p class="">• Fusing hardware and software to create immersive experiences</p>
          <p class="">• Guiding projects from initial concept through final execution</p>

          <p class="mt-10">By combining artistic vision with technical prowess, I elevate client projects to new heights of
            creativity and functionality.</p>
        </div>
      </div>
      <div class="mt-10">
        <am-title h=3 title1="INDUSTRIES & CLIENTS" title2="" tag1="DEFENCE | MEDICAL | AUTOMOTIVE   | EDUCATION" tag2="">
        </am-title>
        <div class="">
          <p class="text-sd">
            Rolls Royce, Jaguar Land Rover, Honda, Nissan, Shell, Ferrari, Ducati MotoGP, Glenmorangie, Thales, and more.
          </p>
        </div>
      </div>
      <div class="mt-10">
        <am-title h=3 title1="AI SOLUTIONS" title2="" tag1="" tag2=""></am-title>
      </div>
      <!-- <div class="mt-10">
                  <img class="rounded-lg border border-gray-700" src="assets/img/vitiligo-katie-hero.png" alt="">
                </div> -->
      <!-- <div class="mt-10">
                  <img class="rounded-lg border border-gray-700" src="assets/img/rolex_1920x1080_img7.jpg" alt="">
                </div> -->
      <!-- <div class="mt-10">
                  <img class="rounded-lg border border-gray-700" src="assets/img/Pentalver_IMG1.jpg" alt="">
                </div> -->
      <!-- <div class="mt-10">
                  <img class="rounded-lg border border-gray-700" src="assets/img/image 6.png" alt="">
                </div> -->
      <div class="mt-10">
        <am-title h=3 title1="PLATFORMS & TECH STACKS" tag1="IOS | ANDROID | WIN | LINUX | MACOS | WEBGL" class="mt-10">
        </am-title>
        <div class="mt-10">
          <p class="text-sd">
            Animation: Endorsed by 2 colleagues at Flipside Group (14 endorsements)<br>
            Rendering: Recognized by David Cathro and 3 colleagues at Flipside Group (8 endorsements)<br>
            Motion Graphics: Vouched for by 2 colleagues at Flipside Group (10 endorsements)<br>
          </p>
        </div>
      </div>
      <div class="mt-10">
        <am-title h=3 title1="EXPERIENCE" tag1=""></am-title>
        <div class="mt-10">
          <p class="text-sd">
            - Tech Lead / Tech Art Director at Flipside Group, Mar 2023 - Present<br>
            - Tech Art Director, Research Developer at Diverse Interactive, Nov 2016 - Mar 2023 (6 yrs 5 mos)<br>
            - Contract Tech Artist & 3D Designer at Aeron Miles Design, Surrey, May 2015 - Nov 2016 (1 yr 7 mos)<br>
          </p>
        </div>
      </div>
    </div>`
  }
}