import { AMElement } from '../base'
import { customElement, html, unsafeHTML, until, property, origin } from '../lit'

@customElement('am-content-loader')
export class AMContentLoader extends AMElement {

    @property({ type: String })
    @property()
    path = ""

    constructor() {
        super()
    }

    content = () => fetch(origin + '/' + this.path).then(r => r.text()).then(t => unsafeHTML(t))

    render() {
        if (this.path === "" || this.path === undefined) return
        return html`${until(this.content(), "")}`
    }
}


