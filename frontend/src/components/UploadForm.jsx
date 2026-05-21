// frontend/src/components/UploadForm.jsx

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function UploadForm({ captureData, onResult, onReset }) {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!captureData?.blob) {
      setError(t('upload.captureFirst'))
      return
    }

    setLoading(true)
    setError(null)

    const claimId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    const form = new FormData()
    form.append('image', captureData.blob, 'crop.jpg')
    form.append('lat', captureData.lat ?? 0)
    form.append('lng', captureData.lng ?? 0)
    form.append('timestamp', captureData.timestamp ?? new Date().toISOString())
    form.append('uid', user?.uid ?? 'anonymous')
    form.append('display_name', user?.displayName ?? t('common.farmer'))
    form.append('claim_id', claimId)

    try {
      setProgress(t('upload.uploading'))
      const res = await fetch(`${BACKEND}/api/analyze`, { method: 'POST', body: form })

      setProgress(t('upload.analyzing'))
      const json = await res.json()

      if (!json.success) throw new Error(json.error || t('upload.failed'))

      setProgress(t('upload.generating'))
      await new Promise((r) => setTimeout(r, 500))

      onResult?.(json.data)
    } catch (err) {
      console.error('Submit error:', err)
      setError(err.message || t('upload.errorGeneric'))
    } finally {
      setLoading(false)
      setProgress('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-forest-900/40 border border-forest-800/40 rounded-xl p-4 flex items-center gap-3">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full border border-forest-600" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center text-forest-300 font-semibold text-sm">
            {user?.displayName?.[0] ?? 'F'}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-white">{user?.displayName ?? t('upload.farmer')}</p>
          <p className="text-xs text-forest-500 font-mono">{user?.uid?.slice(0, 16)}…</p>
        </div>
      </div>

      {captureData ? (
        <div className="flex items-center gap-2 text-sm text-forest-400 bg-forest-900/40 border border-forest-700/40 rounded-xl px-4 py-3">
          <span className="text-green-400 text-base">✓</span>
          <span>
            {t('upload.photoReady')} · {new Date(captureData.timestamp).toLocaleString()}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-900/10 border border-amber-800/30 rounded-xl px-4 py-3">
          <span>⚠️</span>
          <span>{t('upload.noPhoto')}</span>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !captureData}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            <span>{progress || t('upload.processing')}</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            {t('upload.analyseBtn')}
          </>
        )}
      </button>

      {captureData && !loading && (
        <button
          type="button"
          onClick={onReset}
          className="w-full text-sm text-forest-500 hover:text-forest-300 transition-colors"
        >
          {t('upload.startOver')}
        </button>
      )}
    </form>
  )
}
