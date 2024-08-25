import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as twgl from 'twgl.js';

@customElement('gl-canvas')
export class GLCanvas extends LitElement {
    @property({ type: String }) width = "100%";  // 0 means 100%
    @property({ type: String }) height = "100px";
    @property({ type: String }) vs: string = 'base';
    @property({ type: String }) fs: string = 'test';
    @property({ type: String }) textureSrc: string = 'assets/tex/font.png';

    private gl: WebGLRenderingContext | null = null;
    private programInfo: twgl.ProgramInfo | null = null;
    private bufferInfo: twgl.BufferInfo | null = null;
    private textures: WebGLTexture | null = null;
    private startTime: number = performance.now();

    static styles = css`
        :host {
            display: block;
            contain: content;
        }
        canvas {
            width: 100%;
            height: 100%;
        }
    `;

    async loadShaderFile(filePath: string): Promise<string> {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (e) {
            console.error(`Failed to load shader from ${filePath}:`, e);
            throw e;
        }
    }

    async firstUpdated() {
        try {
            await this.initGL();
            this.renderLoop();
        } catch (e) {
            console.error("Error initializing WebGL:", e);
        }
    }

    renderLoop() {
        this.renderGL();
        requestAnimationFrame(() => this.renderLoop());
    }

    async initGL() {
        const canvas = this.renderRoot.querySelector('canvas') as HTMLCanvasElement;
        this.gl = canvas.getContext('webgl');

        if (!this.gl) {
            throw new Error('WebGL not supported');
        }

        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        await this.loadTexture();
        await this.loadShaders();

        const arrays = {
            position: { numComponents: 2, data: [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1] }
        };
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);
    }

    async loadTexture() {
        return new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                if (this.gl) {
                    this.textures = twgl.createTexture(this.gl, { src: img });
                    resolve();
                }
            };
            img.onerror = reject;
            img.src = this.textureSrc;
        });
    }

    async loadShaders() {
        const vs = await this.loadShaderFile(`assets/shaders/${this.vs}.vert`);
        const fs = await this.loadShaderFile(`assets/shaders/${this.fs}.frag`);

        if (this.gl) {
            this.programInfo = twgl.createProgramInfo(this.gl, [vs, fs]);
        }
    }

    renderGL() {
        if (!this.gl || !this.programInfo || !this.bufferInfo) return;

        twgl.resizeCanvasToDisplaySize(this.gl.canvas as HTMLCanvasElement);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        this.gl.useProgram(this.programInfo.program);
        twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
        twgl.setUniforms(this.programInfo, {
            u_texture: this.textures,
            u_time: (performance.now() - this.startTime) / 1000,
            u_resolution: [this.gl.canvas.width, this.gl.canvas.height],
        });
        twgl.drawBufferInfo(this.gl, this.bufferInfo);
    }

    render() {
        const style = this.width ? `width: ${this.width}px; height: ${this.height}px;` : `height: ${this.height}px;`;
        return html`
            <canvas style="${style}"></canvas>
        `;
    }
}