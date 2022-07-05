import { LitElement } from "lit"

export class RootLitElement extends LitElement {
    constructor() {
        super()
    }
    
    createRenderRoot() {
        return this
    }
}