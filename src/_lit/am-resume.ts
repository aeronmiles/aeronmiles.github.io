import { customElement, html, RootLitElement } from './lit'

@customElement('am-resume')
export class Resume extends RootLitElement {

    constructor() {
        super()
    }

    render() {
        return html`
        <div class="max-w-6xl m-auto px-6 sm:px-12 md:px-24 lg:px-40">
            <img class="m-auto pt-6 black " src="assets/mug/am-mug-art1.png" alt="Mugshot">
            <div class="text-sm">
                <!-- <am-title title1="TECH ART" title2="RESEARCH DEVELOPER" tag1="┌─> DESIGN──> PROVE──> OPTIMIZE──>" tag2="└──────────┘ ──────┘ ─────────┘"></am-title> -->
                <am-title title1="TECH ART" title2="RESEARCH DEVELOPER" tag1="DESIGN | PROVE | OPTIMIZE"></am-title>
                <am-title2 title1="ABOUT" tag1=""></am-title2>
                <div class="">
                    <!-- <svg height="9" width="9" class="absolute top-0 right-0">
                        <polygon points="0,0 9,9 9,0" style="fill:var(--color-black)" />
                    </svg> -->
                    <!-- <svg height="9" width="9" class="absolute top-0 left-0">
                                <polygon points="0,0 0,9 9,0" style="fill:var(--color-black)" />
                            </svg>
                            <svg height="9" width="9" class="absolute bottom-0 right-0">
                                <polygon points="9,0, 9,9, 0,9" style="fill:var(--color-black)" />
                            </svg> -->
                    <!-- <am-polygon v0='[9,0]' v1='[9,9]' v2='[0,9]' v3='[0,0]' color="#11111"></am-polygon> -->
                    <p class="text-sm text-white">Solving for design and application development in interactive media, AR and VR, for mobile, desktop and other platforms.</p>
                </div>
                <am-title2 title1="SKILLS" tag1=""></am-title2>
                <div class="">
                    
                    <!-- <svg height="9" width="9" class="absolute top-0 right-0">
                        <polygon points="0,0 9,9 9,0" style="fill:var(--color-black)" />
                    </svg> -->
                    <!-- <svg height="9" width="9" class="absolute top-0 left-0">
                                <polygon points="0,0 0,9 9,0" style="fill:var(--color-black)" />
                            </svg>
                            <svg height="9" width="9" class="absolute bottom-0 right-0">
                                <polygon points="9,0, 9,9, 0,9" style="fill:var(--color-black)" />
                            </svg> -->
                    <p class="text-sm text-white">I’m excited to work in a time of great progress and innovation, where the
                        tools and techniques I use today didn’t exist yesterday. Prototyping and resolving cutting edge tech in
                        the aesthetic and objective domains. Pipeline creation and management ensuring highest standards for
                        constrained production schedules. Solving for design and application development in interactive media,
                        augmented reality and virtual reality on mobile, desktop and other platforms.</p>
                </div>
                <am-title2 title1="EXPERIENCE" tag1=""></am-title2>
                <div class="">
                    
                    <!-- <svg height="9" width="9" class="absolute top-0 right-0">
                        <polygon points="0,0 9,9 9,0" style="fill:var(--color-black)" />
                    </svg> -->
                    <!-- <svg height="9" width="9" class="absolute top-0 left-0">
                                <polygon points="0,0 0,9 9,0" style="fill:var(--color-black)" />
                            </svg>
                            <svg height="9" width="9" class="absolute bottom-0 right-0">
                                <polygon points="9,0, 9,9, 0,9" style="fill:var(--color-black)" />
                            </svg> -->
                    <p class="text-sm text-white">I’m excited to work in a time of great progress and innovation, where the
                        tools and techniques I use today didn’t exist yesterday. Prototyping and resolving cutting edge tech in
                        the aesthetic and objective domains. Pipeline creation and management ensuring highest standards for
                        constrained production schedules. Solving for design and application development in interactive media,
                        augmented reality and virtual reality on mobile, desktop and other platforms.</p>
                </div>
                <am-title2 title1="CLIENTS" tag1=""></am-title2>
                <div class="">
                    
                    <!-- <svg height="9" width="9" class="absolute top-0 right-0">
                        <polygon points="0,0 9,9 9,0" style="fill:var(--color-black)" />
                    </svg> -->
                    <!-- <svg height="9" width="9" class="absolute top-0 left-0">
                                <polygon points="0,0 0,9 9,0" style="fill:var(--color-black)" />
                            </svg>
                            <svg height="9" width="9" class="absolute bottom-0 right-0">
                                <polygon points="9,0, 9,9, 0,9" style="fill:var(--color-black)" />
                            </svg> -->
                    <p class="text-sm text-white">I’m excited to work in a time of great progress and innovation, where the
                        tools and techniques I use today didn’t exist yesterday. Prototyping and resolving cutting edge tech in
                        the aesthetic and objective domains. Pipeline creation and management ensuring highest standards for
                        constrained production schedules. Solving for design and application development in interactive media,
                        augmented reality and virtual reality on mobile, desktop and other platforms.</p>
                </div>
            </div>
        </div>`
    }
}


