import { customElement, html, RootLitElement } from './lit'

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
        <div class="bounds mt-7">
            <!-- <gl-canvas></gl-canvas> -->
                <am-title h=2 title1="TECHNICAL ART DIRECTOR" title2="" tag1="DESIGN ─> INNOVATE ─> OPTIMIZE" tag2=""></am-title>
                <!-- <am-title h=2 title1="TECHNICAL ART DIRECTOR" title2="" tag1="┌─> DESIGN ─> INNOVATE ─> OPTIMIZE ─>" tag2="└──────────┘ ────────┘ ─────────┘"></am-title> -->
                <am-title h=3 title1="ABOUT ME" tag1=">> innovating"></am-title>
                <div class="">
                    <p class="text-sm text-white">
                        I am passionate about the intersection of art and technology. What excites me most is working in an era of rapid innovation, where the tools and techniques I employ today were non-existent just a short while ago. I have a penchant for prototyping, finding resolutions in both the aesthetic and logical realms. My expertise lies in crafting and managing pipelines that uphold the highest standards even under tight production schedules. My quest for innovative solutions has led me to explore the vast horizons of interactive media, AR, and VR across various platforms – mobile, desktop, and beyond.
                    </p>
                </div>
                <am-title h=3 title1="SKILLS" tag1=""></am-title>
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
