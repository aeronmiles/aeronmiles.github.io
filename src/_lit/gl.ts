import { customElement, html, RootLitElement } from './lit'
import * as twgl from "twgl.js";

@customElement('gl')
export class GL extends RootLitElement {
    gl_ctx;
    programInfo;
    bufferInfo;

    constructor() {
        super();
        this.init();
    }

    init() {
        this.gl_ctx = <WebGLRenderingContext>(<HTMLCanvasElement>document.getElementById("c")).getContext("webgl");
        this.programInfo = twgl.createProgramInfo(this.gl_ctx, ["vs", "fs"]);
        const arrays = {
            position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
        };
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl_ctx, arrays);
    }

    renderGL(time, gl) {
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        console.log(gl.canvas.width, gl.canvas.height);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        const uniforms = {
            time: time * 0.001,
            resolution: [gl.canvas.width, gl.canvas.height],
        };

        gl.useProgram(this.programInfo.program);
        twgl.setBuffersAndAttributes(gl, this.programInfo, this.bufferInfo);
        twgl.setUniforms(this.programInfo, uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo);

    }

    render() {
        this.renderGL(10, this.gl_ctx);
        return html`
        `
    }

    vs() {
        return `attribute vec4 position;
                void main() {
                    gl_Position = position;
                }`
    }

    fs() {
        return `precision mediump float;
                                                
                uniform vec2 resolution;
                uniform float time;
                
                void main() {
                vec2 uv = gl_FragCoord.xy / resolution;
                float color = 0.0;
                // lifted from glslsandbox.com
                color += sin( uv.x * cos( time / 3.0 ) * 60.0 ) + cos( uv.y * cos( time / 2.80 ) * 10.0 );
                color += sin( uv.y * sin( time / 2.0 ) * 40.0 ) + cos( uv.x * sin( time / 1.70 ) * 40.0 );
                color += sin( uv.x * sin( time / 1.0 ) * 10.0 ) + sin( uv.y * sin( time / 3.50 ) * 80.0 );
                color *= sin( time / 10.0 ) * 0.5;
                
                gl_FragColor = vec4( vec3( color * 0.5, sin( color + time / 2.5 ) * 0.75, color ), 1.0 );
                }`
    }
}