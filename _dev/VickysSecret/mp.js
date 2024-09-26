export class AMMediaPipe extends HTMLElement {
  constructor() {
    super()
    this.videoElement = null
    this.canvasElement = null
    this.holistic = null
    this.camera = null
    console.log('AMMediaPipe constructor called')
  }

  connectedCallback() {
    console.log('AMMediaPipe connected')
    this.innerHTML = this.render()
    requestAnimationFrame(() => {
      this.initializeMediaPipe()
    })
  }

  initializeMediaPipe() {
    console.log('Initializing MediaPipe')
    this.videoElement = this.querySelector('.mp-input_video')
    this.canvasElement = this.querySelector('.mp-output_canvas')

    if (!this.videoElement || !this.canvasElement) {
      console.error('Video or canvas element not found')
      return
    }

    const canvasCtx = this.canvasElement.getContext('2d')

    if (!canvasCtx) {
      console.error('Could not get 2D context from canvas')
      return
    }

    console.log('Setting up Holistic')
    this.holistic = new Holistic({
      locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    })

    this.holistic.setOptions({
      static_image_mode: true,
      enableFaceGeometry: false,
      modelComplexity: 1,
      selfieMode: true,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      refineFaceLandmarks: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    this.holistic.onResults((results) => {
      // console.log('Holistic results received', results)
      this.drawResults(results, canvasCtx)
    })
    console.log('Setting up camera')
    this.camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.holistic.send({image: this.videoElement})
      },
      width: 1280,
      height: 720,
    })

    this.camera.start().then(() => {
      console.log('Camera started')
    }).catch((error) => {
      console.error('Error starting camera:', error)
    })
  }

  drawResults(results, canvasCtx) {
    canvasCtx.save()
    canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)

    if (results.segmentationMask) {
      canvasCtx.drawImage(results.segmentationMask, 0, 0,
        this.canvasElement.width, this.canvasElement.height)

      canvasCtx.globalCompositeOperation = 'source-in'
      canvasCtx.fillStyle = '#00FF00'
      canvasCtx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height)

      canvasCtx.globalCompositeOperation = 'destination-atop'
      canvasCtx.drawImage(
        results.image, 0, 0, this.canvasElement.width, this.canvasElement.height
      )
    }

    canvasCtx.globalCompositeOperation = 'source-over'
    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
        {color: '#00FF00', lineWidth: 4})
      drawLandmarks(canvasCtx, results.poseLandmarks,
        {color: '#FF0000', lineWidth: 2})
    }
    // if (results.faceLandmarks) {
    //   drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
    //     {color: '#C0C0C070', lineWidth: 1})
    // }
    // if (results.leftHandLandmarks) {
    //   drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
    //     {color: '#CC0000', lineWidth: 5})
    //   drawLandmarks(canvasCtx, results.leftHandLandmarks,
    //     {color: '#00FF00', lineWidth: 2})
    // }
    // if (results.rightHandLandmarks) {
    //   drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
    //     {color: '#00CC00', lineWidth: 5})
    //   drawLandmarks(canvasCtx, results.rightHandLandmarks,
    //     {color: '#FF0000', lineWidth: 2})
    // }
    canvasCtx.restore()
  }

  render() {
    return `
      <div class="mp-container">
        <video class="mp-input_video" style="display: none;"></video>
        <canvas class="mp-output_canvas" width="360px" height="640px"></canvas>
      </div>`
  }
}

customElements.define('am-media-pipe', AMMediaPipe)