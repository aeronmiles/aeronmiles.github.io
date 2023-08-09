import { customElement, html, RootLitElement, property } from './lit'

@customElement('am-polygon')
export class Polygon extends RootLitElement {

    @property({ type: Array })
    v0 = [0, 0]
    @property({ type: Array })
    v1 = [0, 0]
    @property({ type: Array })
    v2 = [0, 0]
    @property({ type: Array })
    v3 = [0, 0]
    @property()
    color = '#0000'

    constructor() {
        super()
    }

    render() {
        return html`<svg height="9" width="9" class="absolute top-0 right-0">
                        <polygon points="${this.v0[0]},${this.v0[1]},${this.v1[0]},${this.v1[1]},${this.v2[0]},${this.v2[1]},${this.v3[0]},${this.v3[1]}" style="fill:#1111" />
                    </svg>`
    }
}


