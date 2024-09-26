export const mimeTypes = [
  // H.264 codecs (widely supported, including iOS)
  'video/mp4;codecs=h264,aac',
  'video/webm;codecs=h264,opus',
  'video/webm;codecs=h264,vorbis',

  // HEVC codec (supported on newer iOS devices)
  'video/mp4;codecs=hevc,mp4a.40.2',

  // VP8 and VP9 codecs
  'video/webm;codecs=vp9,opus',
  'video/webm;codecs=vp8,opus',
  'video/webm;codecs=vp9,vorbis',
  'video/webm;codecs=vp8,vorbis',

  // Generic types (fallback options)
  'video/webm',
  'video/mp4',

  // Older codecs (less common, but included for broader support)
  'video/webm;codecs=daala',
  'video/mpeg',

  // For very old browsers that might not support the above
  'video/ogg',
]