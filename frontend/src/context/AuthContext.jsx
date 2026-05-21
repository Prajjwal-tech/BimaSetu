// frontend/src/context/AuthContext.jsx
// Single source of truth for auth (local session + Firebase)

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase'

const AuthContext = createContext(null)

const TOKEN_KEY = 'bimasetu_token'
const USER_KEY = 'bimasetu_user'
const MOCK_KEY = 'bimasetu_mock_user'

export function farmerIdFromUid(uid) {
  if (!uid) return '#BMS0000'
  const compact = uid.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase()
  return `#BMS${compact.padStart(4, '0').slice(-4)}`
}

function normalizeLocalUser(stored, token) {
  const email = stored.email || ''
  const name = stored.name || stored.displayName || email.split('@')[0] || 'Farmer'
  const uid = stored.uid || `local-${email || token || Date.now()}`
  return {
    uid,
    name,
    email,
    displayName: name,
    photoURL: stored.photoURL || null,
  }
}

function normalizeFirebaseUser(firebaseUser) {
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Farmer',
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Farmer',
    photoURL: firebaseUser.photoURL || null,
    _firebase: firebaseUser,
  }
}

function readLocalSession() {
  const token = localStorage.getItem(TOKEN_KEY)
  const raw = localStorage.getItem(USER_KEY)
  if (!token || !raw) return null
  try {
    return normalizeLocalUser(JSON.parse(raw), token)
  } catch {
    return null
  }
}

function persistLocalSession(user, tokenPrefix = 'token') {
  const token = `${tokenPrefix}_${Date.now()}`
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      uid: user.uid,
      name: user.name,
      email: user.email,
      displayName: user.displayName,
    })
  )
  localStorage.removeItem(MOCK_KEY)
}

function clearAllSessionKeys() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(MOCK_KEY)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const local = readLocalSession()
    if (local) {
      setUser(local)
      setLoading(false)
      return
    }

    const mockSession = localStorage.getItem(MOCK_KEY)
    if (mockSession) {
      try {
        const parsed = JSON.parse(mockSession)
        setUser(normalizeLocalUser(parsed, 'mock'))
      } catch {
        /* ignore */
      }
      setLoading(false)
      return
    }

    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser ? normalizeFirebaseUser(firebaseUser) : null)
        setLoading(false)
      })
      return unsubscribe
    }

    setLoading(false)
  }, [])

  const login = useCallback((credentials) => {
    const { email, name, tokenPrefix = 'token' } = credentials
    const displayName = name || email?.split('@')[0] || 'Farmer'
    const sessionUser = {
      uid: `local-${(email || displayName).replace(/\s/g, '-').toLowerCase()}`,
      name: displayName,
      email: email || '',
      displayName,
    }
    persistLocalSession(sessionUser, tokenPrefix)
    setUser(sessionUser)
    return sessionUser
  }, [])

  const loginAsMockUser = useCallback((mockUser) => {
    const normalized = normalizeLocalUser(mockUser, 'mock')
    localStorage.setItem(MOCK_KEY, JSON.stringify(normalized))
    setUser(normalized)
  }, [])

  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = {
        ...prev,
        name: updates.name ?? prev.name,
        displayName: updates.name ?? prev.displayName,
        email: updates.email ?? prev.email,
      }
      const token = localStorage.getItem(TOKEN_KEY)
      if (token) {
        localStorage.setItem(
          USER_KEY,
          JSON.stringify({
            uid: next.uid,
            name: next.name,
            email: next.email,
            displayName: next.displayName,
          })
        )
      }
      return next
    })
  }, [])

  const logout = useCallback(async () => {
    clearAllSessionKeys()
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth)
      } catch (err) {
        console.error('Firebase signOut failed:', err)
      }
    }
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        loginAsMockUser,
        updateProfile,
        farmerId: farmerIdFromUid(user?.uid),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
