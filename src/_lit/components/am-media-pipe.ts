import { Camera } from "@mediapipe/camera_utils";
import { Holistic, POSE_CONNECTIONS, FACEMESH_TESSELATION, HAND_CONNECTIONS } from "@mediapipe/holistic";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { AMElement } from '../base';
import { customElement, html } from "../lit";


@customElement('am-media-pipe')
export class AMMediaPipe extends AMElement
{
  private videoElement: HTMLVideoElement | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private holistic: Holistic | null = null;
  private camera: Camera | null = null;

  constructor()
  {
    super();
  }

  firstUpdated()
  {
    this.initializeMediaPipe();
  }

  initializeMediaPipe()
  {
    this.videoElement = this.renderRoot.querySelector('video') as HTMLVideoElement;
    this.canvasElement = this.renderRoot.querySelector('canvas') as HTMLCanvasElement;

    if (!this.videoElement || !this.canvasElement)
    {
      console.error('Video or canvas element not found');
      return;
    }

    const canvasCtx = this.canvasElement.getContext('2d');

    if (!canvasCtx)
    {
      console.error('Could not get 2D context from canvas');
      return;
    }

    const onResults = (results: any) =>
    {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, this.canvasElement!.width, this.canvasElement!.height);

      if (results.segmentationMask)
      {
        canvasCtx.drawImage(results.segmentationMask, 0, 0,
          this.canvasElement!.width, this.canvasElement!.height);

        // Only overwrite existing pixels.
        canvasCtx.globalCompositeOperation = 'source-in';
        canvasCtx.fillStyle = '#00FF00';
        canvasCtx.fillRect(0, 0, this.canvasElement!.width, this.canvasElement!.height);

        // Only overwrite missing pixels.
        canvasCtx.globalCompositeOperation = 'destination-atop';
        canvasCtx.drawImage(
          results.image, 0, 0, this.canvasElement!.width, this.canvasElement!.height);
      }

      canvasCtx.globalCompositeOperation = 'source-over';
      if (results.poseLandmarks)
      {
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
          { color: '#00FF00', lineWidth: 4 });
        drawLandmarks(canvasCtx, results.poseLandmarks,
          { color: '#FF0000', lineWidth: 2 });
      }
      if (results.faceLandmarks)
      {
        drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
          { color: '#C0C0C070', lineWidth: 1 });
      }
      if (results.leftHandLandmarks)
      {
        drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
          { color: '#CC0000', lineWidth: 5 });
        drawLandmarks(canvasCtx, results.leftHandLandmarks,
          { color: '#00FF00', lineWidth: 2 });
      }
      if (results.rightHandLandmarks)
      {
        drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
          { color: '#00CC00', lineWidth: 5 });
        drawLandmarks(canvasCtx, results.rightHandLandmarks,
          { color: '#FF0000', lineWidth: 2 });
      }
      canvasCtx.restore();
    };

    this.holistic = new Holistic({
      locateFile: (file) =>
      {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      }
    });

    this.holistic.setOptions({
      modelComplexity: 2,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.holistic.onResults(onResults);

    this.camera = new Camera(this.videoElement, {
      onFrame: async () =>
      {
        await this.holistic!.send({ image: this.videoElement! });
      },
      width: 1280,
      height: 720
    });

    this.camera.start();
  }

  render()
  {
    return html`
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/holistic/holistic.js" crossorigin="anonymous"></script>
        <div class="mp-container">
          <video class="mp-input_video hidden"></video>
          <canvas class="mp-output_canvas" width="640px" height="360px"></canvas>
        </div>`
  }
}
