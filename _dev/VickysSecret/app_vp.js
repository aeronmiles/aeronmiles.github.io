import {AMMediaPipe} from './mp'
// import {VideoProcessor} from './video_processor'

class ARScene {
  constructor() {
    this.mediaRecorder = null
    this.recordedChunks = []
    this.isRecording = false
    this.startButton = null
    this.stopButton = null
    this.videoProcessor = null
  }

  async setup() {
    console.log('Setting up AR Scene')
    // try {
    await this.checkCameraPermission()
    this.setupVideoProcessor()
    this.setupRecordingButtons()
    // } catch (error) {
    //   console.error('Error setting up AR Scene:', error)
    //   this.showError('Failed to set up AR Scene. Please refresh and try again.')
    // }
  }

  async checkCameraPermission() {
    console.log('Checking camera permission')
    // try {
    const stream = await navigator.mediaDevices.getUserMedia({video: true})
    stream.getTracks().forEach(track => track.stop())
    console.log('Camera permission granted')
    // } catch (error) {
    //   console.error('Camera permission denied:', error)
    //   this.showError('Camera permission is required. Please allow access and refresh the page.')
    //   throw error
    // }
  }

  showError(message) {
    const errorMessage = document.createElement('div')
    errorMessage.textContent = message
    errorMessage.style.color = 'red'
    errorMessage.style.padding = '20px'
    document.body.prepend(errorMessage)
  }

  setupVideoProcessor() {
    const config = {}  // Add any specific configuration here
    const downsampleFactor = 1  // No downsampling
    const isFrontFacing = true  // Use front-facing camera
    const useGlCanvas = true  // Use WebGL for rendering
    const useGpuInput = false  // Don't use GPU input for now

    this.videoProcessor = new VideoProcessor(config, downsampleFactor, isFrontFacing, useGlCanvas, useGpuInput)

    const canvas = document.createElement('canvas')
    canvas.width = 1280  // Set to desired width
    canvas.height = 720  // Set to desired height
    document.getElementById('mediapipe-container').appendChild(canvas)

    this.videoProcessor.initialize(canvas)

    // Create and set up AMMediaPipe as the frame processor
    const amMediaPipe = new AMMediaPipe()
    this.videoProcessor.setFrameProcessor(amMediaPipe)

    // Set up output processor if needed
    // this.videoProcessor.setOutputProcessor(new OutputProcessor());

    // Set up onVideoFrame listener if needed
    // this.videoProcessor.setOnVideoFrame((video, timestamp) => {
    //   // Handle each video frame
    // });
  }

  setupRecordingButtons() {
    this.startButton = document.getElementById('start-recording')
    this.stopButton = document.getElementById('stop-recording')

    if (!this.startButton || !this.stopButton) {
      console.error('Recording buttons not found')
      return
    }

    this.startButton.addEventListener('click', () => this.startRecording())
    this.stopButton.addEventListener('click', () => this.stopRecording())
    this.updateButtonState()
  }

  startRecording() {
    if (this.isRecording) {
      return
    }

    const canvas = document.querySelector('canvas')
    const stream = canvas.captureStream(30)  // 30 FPS

    this.recordedChunks = []
    this.mediaRecorder = new MediaRecorder(stream, {mimeType: 'video/webm'})

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data)
      }
    }

    this.mediaRecorder.onstop = () => {
      this.saveVideo()
    }

    this.mediaRecorder.start()
    this.isRecording = true
    this.updateButtonState()
    console.log('Recording started')
  }

  stopRecording() {
    if (!this.isRecording) {
      return
    }
    this.mediaRecorder.stop()
    this.isRecording = false
    this.updateButtonState()
    console.log('Recording stopped')
  }

  updateButtonState() {
    if (this.startButton && this.stopButton) {
      this.startButton.disabled = this.isRecording
      this.stopButton.disabled = !this.isRecording
    }
  }

  saveVideo() {
    const blob = new Blob(this.recordedChunks, {type: 'video/webm'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.style = 'display: none'
    a.href = url
    a.download = 'ar-recording.webm'
    a.click()
    window.URL.revokeObjectURL(url)
  }
}

async function initializeARScene() {
  const arScene = new ARScene()

  // try {
  await customElements.whenDefined('am-media-pipe')
  await arScene.setup()
  // } catch (error) {
  //   console.error('Error initializing AR Scene:', error)
  // }
}

initializeARScene()
