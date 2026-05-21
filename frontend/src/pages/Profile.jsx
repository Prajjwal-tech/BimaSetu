import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  Shield,
  LogOut,
  CheckCircle2,
  Circle,
  Sprout,
  Home,
  LayoutDashboard,
  KeyRound,
  Bell,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const cardStyle = {
  background: 'rgba(16, 35, 21, 0.6)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(70, 130, 70, 0.4)',
}

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout, updateProfile, farmerId } = useAuth()
  const { t } = useLanguage()

  const defaultChecklist = [
    { id: 'profile', labelKey: 'profile.checkName', done: false },
    { id: 'explore', labelKey: 'profile.checkSteps', done: false },
    { id: 'upload', labelKey: 'profile.checkUpload', done: false },
    { id: 'pdf', labelKey: 'profile.checkPdf', done: false },
  ]

  const [editName, setEditName] = useState(user?.name || '')
  const [saving, setSaving] = useState(false)
  const [saveFlash, setSaveFlash] = useState(false)
  const [checklist, setChecklist] = useState(defaultChecklist)
  const [claimsCount, setClaimsCount] = useState(0)

  const checklistKey = `bimasetu_checklist_${user?.uid || 'guest'}`

  const initials = (user?.name || user?.email || 'F')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const profileProgress = useMemo(() => {
    let n = 0
    if (user?.name?.trim()) n += 25
    if (user?.email) n += 25
    if (checklist.filter((c) => c.done).length >= 2) n += 25
    if (claimsCount > 0) n += 25
    return n
  }, [user, checklist, claimsCount])

  const fetchClaimCount = useCallback(async () => {
    if (!user?.uid) return
    try {
      const res = await fetch(`${BACKEND}/api/claims?uid=${encodeURIComponent(user.uid)}`)
      const json = await res.json()
      if (json.success) setClaimsCount(json.data?.claims?.length || 0)
    } catch {
      setClaimsCount(0)
    }
  }, [user?.uid])

  useEffect(() => {
    setEditName(user?.name || '')
  }, [user?.name])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(checklistKey)
      if (saved) setChecklist(JSON.parse(saved))
    } catch {
      /* ignore */
    }
  }, [checklistKey])

  useEffect(() => {
    if (user?.name?.trim()) {
      setChecklist((prev) =>
        prev.map((c) => (c.id === 'profile' ? { ...c, done: true } : c))
      )
    }
  }, [user?.name])

  useEffect(() => {
    if (claimsCount > 0) {
      setChecklist((prev) =>
        prev.map((c) =>
          c.id === 'upload' || c.id === 'pdf' ? { ...c, done: true } : c
        )
      )
    }
  }, [claimsCount])

  useEffect(() => {
    localStorage.setItem(checklistKey, JSON.stringify(checklist))
  }, [checklist, checklistKey])

  useEffect(() => {
    fetchClaimCount()
  }, [fetchClaimCount])

  const toggleChecklistItem = (id) => {
    setChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c))
    )
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    const trimmed = editName.trim()
    if (!trimmed) return
    setSaving(true)
    updateProfile({ name: trimmed })
    setSaveFlash(true)
    setTimeout(() => {
      setSaving(false)
      setSaveFlash(false)
    }, 700)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A120E] via-[#0D1811] to-[#0A120E]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
            <User className="w-4 h-4" />
            <span>{t('profile.accountSettings')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{t('profile.myProfile')}</h1>
          <p className="text-gray-400">{t('profile.manageDesc')}</p>
        </header>

        <div className="space-y-6">
          {/* Avatar & identity */}
          <div
            className={`rounded-2xl p-8 transition-all duration-500 ${
              saveFlash ? 'ring-2 ring-amber-400/60' : ''
            }`}
            style={cardStyle}
          >
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className={`relative shrink-0 ${saveFlash ? 'farmer-avatar-ring' : ''}`}>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-3xl font-bold text-emerald-950">
                  {initials}
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left w-full">
                <p className="text-2xl font-bold text-white">{user?.name || t('common.farmer')}</p>
                <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {user?.email || t('profile.noEmail')}
                </p>
                <p className="text-emerald-400 font-mono text-sm mt-2">{farmerId}</p>
                <div className="w-full max-w-xs mt-4 mx-auto sm:mx-0">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{t('profile.profileStrength')}</span>
                    <span>{profileProgress}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-emerald-950 overflow-hidden">
                    <div
                      className="h-full rounded-full farmer-shimmer-bar transition-all duration-700"
                      style={{ width: `${profileProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit profile */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-amber-400" />
              {t('profile.editProfile')}
            </h2>
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
              <div>
                <label className="text-gray-400 text-sm block mb-1.5">{t('profile.displayName')}</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-emerald-950/50 border border-emerald-800/50 text-white focus:border-amber-500 outline-none focus:ring-1 focus:ring-amber-500/30"
                  placeholder={t('profile.namePlaceholder')}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition disabled:opacity-50"
              >
                {saving ? t('common.saving') : t('profile.saveChanges')}
              </button>
            </form>
          </div>

          {/* Account details */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h2 className="text-lg font-bold text-white mb-4">{t('profile.accountDetails')}</h2>
            <dl className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/30">
                <Mail className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <dt className="text-xs text-gray-500 uppercase">{t('auth.email')}</dt>
                  <dd className="text-white">{user?.email || '—'}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/30">
                <KeyRound className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <dt className="text-xs text-gray-500 uppercase">{t('profile.accountId')}</dt>
                  <dd className="text-white text-sm font-mono break-all">{user?.uid || '—'}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/30">
                <LayoutDashboard className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <dt className="text-xs text-gray-500 uppercase">{t('profile.totalClaimsFiled')}</dt>
                  <dd className="text-white">{claimsCount}</dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Setup checklist */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-400" />
              {t('profile.setupChecklist')}
            </h2>
            <div className="space-y-2">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleChecklistItem(item.id)}
                  className="w-full flex items-center gap-3 text-left text-sm py-3 px-4 rounded-xl hover:bg-emerald-900/30 transition group border border-transparent hover:border-emerald-800/40"
                >
                  {item.done ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-600 group-hover:text-amber-400 shrink-0" />
                  )}
                  <span className={item.done ? 'text-gray-500 line-through' : 'text-gray-200'}>
                      {t(item.labelKey)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick links & logout */}
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="rounded-2xl p-5 text-left transition hover:-translate-y-0.5 flex items-center justify-between group"
              style={cardStyle}
            >
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-amber-400" />
                <span className="text-white font-medium">{t('profile.backHome')}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-amber-400 transition" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="rounded-2xl p-5 text-left transition hover:-translate-y-0.5 flex items-center justify-between group"
              style={cardStyle}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-medium">{t('profile.openDashboard')}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition" />
            </button>
          </div>

          <div className="rounded-2xl p-4 flex items-center gap-2 text-gray-500 text-sm" style={cardStyle}>
            <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t('profile.pmfbyNote')}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/20 transition font-medium"
          >
            <LogOut className="w-5 h-5" />
            {t('profile.logoutBtn')}
          </button>
        </div>
      </div>
    </div>
  )
}
