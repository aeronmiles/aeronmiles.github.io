import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as twgl from 'twgl.js';

@customElement('gl-canvas')
export class GLCanvas extends LitElement
{
    @property({ type: Number }) height = 48;
    @property({ type: String }) vs: string = 'base';
    @property({ type: String }) fs: string = 'sdf';

    gl;
    programInfo;
    bufferInfo;
    textures;
    hdr;
    startTime = performance.now();

    static styles = css`
        :host {
            display: block;
            contain: content;
        }
    `;

    async loadShaderFile(filePath: string)
    {
        const response = await fetch(filePath);
        if (!response.ok)
        {
            throw new Error(`Failed to load shader from ${filePath}: ${response.statusText}`);
        }
        return response.text();
    }

    async firstUpdated()
    {
        await this.initGL();
        this.renderLoop();
    }

    renderLoop()
    {
        this.renderGL();
        requestAnimationFrame(() => this.renderLoop());
    }

    // async loadHDR(url)
    // {
    //     // Fetch the binary data
    //     const response = await fetch(url);
    //     const buffer = await response.arrayBuffer();

    //     // Parse the HDR image - this is a simplified parser and might not handle all .hdr files
    //     const data = new Uint8Array(buffer);
    //     const header = new TextDecoder().decode(data.subarray(0, 100)); // assuming the header is < 100 bytes
    //     const width = parseInt(header.match(/-Y (\d+)/)[1], 10);
    //     const height = parseInt(header.match(/\+X (\d+)/)[1], 10);

    //     // Skip the header and extract the RGBE data - this might need more complex parsing for some .hdr files
    //     const rgbeData = data.subarray(header.length);

    //     return { width, height, data: rgbeData };
    // }

    async initGL()
    {
        const canvas = this.renderRoot.querySelector('canvas') as HTMLCanvasElement;
        this.gl = canvas.getContext('webgl');

        this.gl.alpha = true;
        this.gl.premultipliedAlpha = false;

        const img = new Image();
        img.src = 'assets/mug/am-mug-bw-round.png';
        img.onload = () =>
        {
            this.textures = twgl.createTexture(this.gl, {
                src: img,
                //min: this.gl.NEAREST,
                //mag: this.gl.NEAREST,
            });
            this.requestUpdate();
        };

        // const _hdr = new Image();
        // _hdr.src = 'assets/hdr/blue_photo_studio_2k.exr';
        // _hdr.onload = () =>
        // {
        //     this.hdr = twgl.createTexture(this.gl, {
        //         src: _hdr,
        //     });
        // };

        // Load the HDR image
        // const hdrImage = await this.loadHDR('assets/hdr/blue_photo_studio_2k.exr');

        // Upload the RGBE data as a texture
        // this.hdr = twgl.createTexture(this.gl, {
        //     width: hdrImage.width,
        //     height: hdrImage.height,
        //     src: hdrImage.data,
        //     format: this.gl.RGBA,
        //     type: this.gl.UNSIGNED_BYTE,
        //     min: this.gl.LINEAR,
        //     mag: this.gl.LINEAR,
        //     wrap: this.gl.CLAMP_TO_EDGE
        // });

        const vs = await this.loadShaderFile(`assets/shaders/${this.vs}.vert`);
        const fs = await this.loadShaderFile(`assets/shaders/${this.fs}.frag`);

        this.programInfo = twgl.createProgramInfo(this.gl, [vs, fs]);

        const arrays = {
            position: { numComponents: 2, data: [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1] }
        };
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);
    }

    renderGL()
    {
        twgl.resizeCanvasToDisplaySize(this.gl.canvas as HTMLCanvasElement);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        this.gl.useProgram(this.programInfo.program);
        twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
        twgl.setUniforms(this.programInfo, {
            u_texture: this.textures,
            u_time: (performance.now() - this.startTime) / 1000,
            u_resolution: [this.gl.canvas.width, this.gl.canvas.height],
            u_envMap: this.hdr,
        });
        twgl.drawBufferInfo(this.gl, this.bufferInfo);
    }

    updated()
    {
        // Currently empty; consider removing if not used.
    }

    render()
    {
        return html`
            <canvas style="width: 100%" height="${this.height}"></canvas>
        `;
    }
}
