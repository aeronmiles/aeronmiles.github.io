import { customElement, html, RootLitElement } from './lit'
import "./gl-canvas";
import "./am-title";

@customElement('am-resume')
export class Resume extends RootLitElement
{
  constructor()
  {
    super()
  }

  render()
  {
    return html`
        <div class="bounds">
        <!-- <div class="bounds mt-7">
          <gl-canvas></gl-canvas>
        </div> -->
            <am-title h=2 title1="TECHNICAL ART DIRECTOR" title2="" tag1="ENVISION | ORCHESTRATE | ELEVATE" tag2=""></am-title>
            <p>Orchestrating advanced tech to realize visions from concept to fruition</p>
            <am-carousels class="px-8"></am-carousels>
            <div class="mt-7 text-md text-white">
            <p>As an award winning tech art director, I leverage cutting-edge hardware and software solutions to bring innovative ideas to life. My expertise includes:</p>
            
            <!-- Option 2: Using paragraph elements -->
            <p class="mt-7">• Integrating novel hardware components like LiDAR cameras</p>
            <p class="">• Implementing AI computer vision solutions for component identification</p>
            <p class="">• Fusing hardware and software to create immersive experiences</p>
            <p class="">• Guiding projects from initial concept through final execution</p>

            <p class="mt-7">By combining artistic vision with technical prowess, I elevate client projects to new heights of creativity and functionality.</p>
            </div>
            <div class="mt-7">
              <img src="assets/images/vitiligo-katie-hero.png" alt="">
            </div>
            <!-- <div class="mt-7">
              <img src="assets/images/audi3.jpg" alt="">
            </div>
            <div class="mt-7">
              <img src="assets/images/pen1.jpg" alt="">
            </div> -->
            <!-- <div class="mt-7">
                <p class="text-sm text-white">
                    I am passionate about the intersection of art and technology. What excites me most is working in an era of rapid innovation, where the tools and techniques I employ today were non-existent just a short while ago. I have a penchant for prototyping, finding resolutions in both the aesthetic and logical realms. My expertise lies in crafting and managing pipelines that uphold the highest standards even under tight production schedules. My quest for innovative solutions has led me to explore the vast horizons of interactive media, AR, and VR across various platforms – mobile, desktop, and beyond.
                </p>
            </div> -->
            <am-title h=3 title1="SKILLS" tag1="" class="mt-10"></am-title>
            <div class="">
                <p class="text-sm text-white">
                    Animation: Endorsed by 2 colleagues at Flipside Group (14 endorsements)<br>
                    Rendering: Recognized by David Cathro and 3 colleagues at Flipside Group (8 endorsements)<br>
                    Motion Graphics: Vouched for by 2 colleagues at Flipside Group (10 endorsements)<br>
                </p>
            </div>
            <am-title h=3 title1="EXPERIENCE" tag1=""></am-title>
            <div class="">
                <p class="text-sm text-white">
                    - Technical Art Director at Flipside Group, Mar 2023 - Present (7 months)<br>
                    - Technical Art Director, Research Developer at Diverse Interactive, Nov 2016 - Mar 2023 (6 yrs 5 mos)<br>
                    - Contract Technical Artist & 3D Designer at Aeron Miles Design, Surrey, May 2015 - Nov 2016 (1 yr 7 mos)<br>
                </p>
            </div>
            <am-title h=3 title1="CLIENTS" tag1=""></am-title>
            <div class="">
                <p class="text-sm text-white">
                    Rolls Royce, Jaguar Land Rover, Honda, Nissan, Shell, Ferrari, Ducati MotoGP, Glenmorangie, Thales, and more.
                </p>
            </div>
        </div>`
  }
}
