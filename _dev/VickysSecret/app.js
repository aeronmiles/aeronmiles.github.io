import {AMMediaPipe} from './mp.js'

console.log('Registering AMMediaPipe custom element')

class ARScene {
  constructor() {
    this.mediaRecorder = null
    this.recordedChunks = []
    this.isRecording = false
    this.startButton = null
    this.stopButton = null
  }

  async setup() {
    console.log('Setting up AR Scene')
    try {
      await this.checkCameraPermission()
      this.setupMediaPipe()
      this.setupRecordingButtons()
    } catch (error) {
      console.error('Error setting up AR Scene:', error)
      this.showError('Failed to set up AR Scene. Please refresh and try again.')
    }
  }

  async checkCameraPermission() {
    console.log('Checking camera permission')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true})
      stream.getTracks().forEach(track => track.stop())
      console.log('Camera permission granted')
    } catch (error) {
      console.error('Camera permission denied:', error)
      this.showError('Camera permission is required. Please allow access and refresh the page.')
      throw error
    }
  }

  showError(message) {
    const errorMessage = document.createElement('div')
    errorMessage.textContent = message
    errorMessage.style.color = 'red'
    errorMessage.style.padding = '20px'
    document.body.prepend(errorMessage)
  }

  setupMediaPipe() {
    const mediapipeContainer = document.getElementById('mediapipe-container')
    if (!mediapipeContainer) {
      console.error('MediaPipe container not found')
      return
    }

    const amMediaPipe = document.createElement('am-media-pipe')
    mediapipeContainer.appendChild(amMediaPipe)

    console.log('Waiting for MediaPipe canvas')
    this.waitForCanvas(amMediaPipe)
  }

  waitForCanvas(amMediaPipe) {
    const maxAttempts = 50
    let attempts = 0

    const checkCanvas = setInterval(() => {
      attempts++
      const mediapipeCanvas = amMediaPipe.querySelector('.mp-output_canvas')
      if (mediapipeCanvas) {
        console.log('MediaPipe canvas found, setting up')
        clearInterval(checkCanvas)
        this.setupMediaRecorder(mediapipeCanvas)
      } else if (attempts >= maxAttempts) {
        console.error('MediaPipe canvas not found after maximum attempts')
        clearInterval(checkCanvas)
        this.showError('Failed to initialize AR scene. Please refresh and try again.')
      }
    }, 200)
  }

  setupMediaRecorder(canvas) {
    console.log('Setting up MediaRecorder')
    const stream = canvas.captureStream(30)  // 30 FPS

    const selectedMimeType = mimeTypes.find(mimeType => MediaRecorder.isTypeSupported(mimeType))

    if (!selectedMimeType) {
      console.error('No supported mime type found for MediaRecorder')
      this.showError('Video recording is not supported on this device.')
      return
    }

    try {
      this.mediaRecorder = new MediaRecorder(stream, {mimeType: selectedMimeType})
      this.setupMediaRecorderEvents()
    } catch (error) {
      console.error('Error creating MediaRecorder:', error)
      this.showError('Failed to set up video recording. Please try again.')
    }
  }

  setupMediaRecorderEvents() {
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data)
      }
    }

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, {type: this.mediaRecorder.mimeType})
      this.promptToShare(blob)
    }
  }

  promptToShare(blob) {
    const fileExtension = this.mediaRecorder.mimeType.split('/')[1].split(';')[0]
    const file = new File([blob], `ar-recording.${fileExtension}`, {type: this.mediaRecorder.mimeType})

    if (navigator.canShare && navigator.canShare({files: [file]})) {
      navigator.share({
        files: [file],
        title: 'AR Recording',
        text: 'Check out my AR recording!',
      }).then(() => {
        console.log('Video shared successfully')
      }).catch((error) => {
        console.error('Error sharing video:', error)
        this.fallbackDownload(blob)
      })
    } else {
      console.log('Web Share API not supported for files')
      this.fallbackDownload(blob)
    }
  }

  fallbackDownload(blob) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.style = 'display: none'
    a.href = url
    a.download = `ar-recording.${this.mediaRecorder.mimeType.split('/')[1].split(';')[0]}`
    a.click()
    window.URL.revokeObjectURL(url)
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
    if (!this.mediaRecorder || this.isRecording) {
      return
    }
    this.recordedChunks = []
    this.mediaRecorder.start()
    this.isRecording = true
    this.updateButtonState()
    console.log('Recording started')
  }

  stopRecording() {
    if (!this.mediaRecorder || !this.isRecording) {
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
}

async function initializeARScene() {
  const arScene = new ARScene()

  try {
    await customElements.whenDefined('am-media-pipe')
    await arScene.setup()
  } catch (error) {
    console.error('Error initializing AR Scene:', error)
  }
}

initializeARScene()