// frontend/src/components/CameraCapture.jsx
// Opens rear camera, captures a still frame with GPS + timestamp

import { useRef, useState, useEffect, useCallback } from 'react'

export default function CameraCapture({ onCapture }) {
  const videoRef    = useRef(null)
  const canvasRef   = useRef(null)
  const streamRef   = useRef(null)

  const [cameraActive, setCameraActive] = useState(false)
  const [preview,      setPreview]      = useState(null)  // data URL
  const [capturedBlob, setCapturedBlob] = useState(null)
  const [gps,          setGps]          = useState(null)
  const [gpsError,     setGpsError]     = useState(null)
  const [timestamp,    setTimestamp]    = useState(null)
  const [camError,     setCamError]     = useState(null)
  const [capturing,    setCapturing]    = useState(false)

  // ── Stop stream on unmount ─────────────────────────────────────
  useEffect(() => {
    return () => stopCamera()
  }, [])

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    setCameraActive(false)
  }

  // ── Start rear camera ──────────────────────────────────────────
  const startCamera = async () => {
    setCamError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setCameraActive(true)
    } catch (err) {
      console.error('Camera error:', err)
      setCamError('Could not access camera. Check permissions or use the file upload below.')
    }
  }

  // ── Capture frame + GPS ────────────────────────────────────────
  const capturePhoto = useCallback(() => {
    setCapturing(true)
    const video  = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    canvas.width  = video.videoWidth  || 1280
    canvas.height = video.videoHeight || 720
    canvas.getContext('2d').drawImage(video, 0, 0)

    const ts = new Date().toISOString()
    setTimestamp(ts)

    canvas.toBlob(blob => {
      if (!blob) { setCapturing(false); return }
      const url = URL.createObjectURL(blob)
      setPreview(url)
      setCapturedBlob(blob)

      // Get GPS
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            const g = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }
            setGps(g)
            setGpsError(null)
            onCapture?.({ blob, timestamp: ts, ...g })
            setCapturing(false)
          },
          () => {
            setGpsError('GPS unavailable — location will be recorded as 0, 0')
            onCapture?.({ blob, timestamp: ts, lat: 0, lng: 0, accuracy: null })
            setCapturing(false)
          },
          { enableHighAccuracy: true, timeout: 8000 }
        )
      } else {
        setGpsError('Geolocation not supported in this browser')
        onCapture?.({ blob, timestamp: ts, lat: 0, lng: 0, accuracy: null })
        setCapturing(false)
      }

      stopCamera()
    }, 'image/jpeg', 0.92)
  }, [onCapture])

  // ── File upload fallback ───────────────────────────────────────
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ts  = new Date().toISOString()
    const url = URL.createObjectURL(file)
    setPreview(url)
    setCapturedBlob(file)
    setTimestamp(ts)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const g = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }
          setGps(g)
          onCapture?.({ blob: file, timestamp: ts, ...g })
        },
        () => {
          setGpsError('GPS unavailable')
          onCapture?.({ blob: file, timestamp: ts, lat: 0, lng: 0, accuracy: null })
        }
      )
    } else {
      onCapture?.({ blob: file, timestamp: ts, lat: 0, lng: 0, accuracy: null })
    }
  }

  const reset = () => {
    setPreview(null)
    setCapturedBlob(null)
    setGps(null)
    setTimestamp(null)
    setGpsError(null)
    onCapture?.(null)
  }

  return (
    <div className="space-y-4">
      {/* Camera viewfinder / preview */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-forest-900 border border-forest-700/60">
        {!preview && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
            style={{ display: cameraActive ? 'block' : 'none' }}
          />
        )}
        {preview ? (
          <img src={preview} alt="Captured" className="w-full h-full object-cover" />
        ) : !cameraActive ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-forest-500">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm">Camera preview will appear here</p>
          </div>
        ) : null}

        {/* Capture button overlay */}
        {cameraActive && !preview && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center">
            <button
              onClick={capturePhoto}
              disabled={capturing}
              className="w-16 h-16 rounded-full bg-white border-4 border-forest-600 shadow-lg
                         hover:scale-105 active:scale-95 transition-transform duration-150 flex items-center justify-center"
            >
              {capturing
                ? <div className="w-6 h-6 rounded-full border-2 border-forest-600 border-t-transparent animate-spin" />
                : <div className="w-10 h-10 rounded-full bg-forest-600" />}
            </button>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Metadata strip */}
      {(gps || gpsError || timestamp) && (
        <div className="bg-forest-900/60 border border-forest-800/50 rounded-xl p-3 space-y-1.5 text-xs font-mono">
          {timestamp && (
            <div className="flex items-center gap-2 text-forest-300">
              <span className="text-forest-500">⏱</span>
              <span>{timestamp}</span>
            </div>
          )}
          {gps && (
            <div className="flex items-center gap-2 text-forest-300">
              <span className="text-forest-500">📍</span>
              <span>{gps.lat.toFixed(6)}°, {gps.lng.toFixed(6)}°</span>
              {gps.accuracy && <span className="text-forest-600">±{Math.round(gps.accuracy)}m</span>}
            </div>
          )}
          {gpsError && (
            <div className="flex items-center gap-2 text-amber-400">
              <span>⚠️</span>
              <span>{gpsError}</span>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      {camError && (
        <p className="text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">{camError}</p>
      )}

      <div className="flex gap-3 flex-wrap">
        {!preview && !cameraActive && (
          <button onClick={startCamera} className="btn-primary flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Open Camera
          </button>
        )}
        {cameraActive && (
          <button onClick={stopCamera} className="btn-secondary text-sm">Cancel</button>
        )}

        {/* File upload always available */}
        <label className="btn-secondary flex items-center gap-2 cursor-pointer text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Upload Photo
          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </label>

        {preview && (
          <button onClick={reset} className="text-sm text-red-400 hover:text-red-300 transition-colors ml-auto">
            Retake
          </button>
        )}
      </div>
    </div>
  )
}
