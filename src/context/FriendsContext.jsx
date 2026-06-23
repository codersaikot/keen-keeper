import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const FriendsContext = createContext(null)
const STORAGE_KEY = 'keenkeeper_friends'
const DAY_MS = 24 * 60 * 60 * 1000
const FETCH_DELAY_MS = 550

/**
 * friends.json stores a `daysSinceContact` offset instead of a fixed date, so
 * the seed data is converted into a real ISO date the first time it loads.
 * After that, real dates live in localStorage and evolve as the user
 * interacts with the app (check-ins, snoozes, edits).
 */
function hydrateSeedFriend(raw) {
  const lastContactDate = new Date(Date.now() - raw.daysSinceContact * DAY_MS).toISOString()
  return {
    id: raw.id,
    name: raw.name,
    avatarSeed: raw.avatarSeed,
    email: raw.email,
    phone: raw.phone,
    bio: raw.bio,
    tags: raw.tags,
    goalDays: raw.goalDays,
    preferredContact: raw.preferredContact,
    lastContactDate,
    snoozedUntil: null,
    archived: false,
  }
}

function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `f-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        let data
        const cached = localStorage.getItem(STORAGE_KEY)
        if (cached) {
          data = JSON.parse(cached)
        } else {
          const res = await fetch('/friends.json')
          if (!res.ok) throw new Error('Could not reach friends.json')
          const raw = await res.json()
          data = raw.map(hydrateSeedFriend)
        }

        // Small deliberate delay so the loading state is always visible —
        // mirrors a real network round trip rather than a flash of nothing.
        await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY_MS))

        if (!cancelled) {
          setFriends(data)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Something went wrong loading your friends.')
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const updateFriend = useCallback((id, updates) => {
    setFriends((prev) => {
      const next = prev.map((friend) => (friend.id === id ? { ...friend, ...updates } : friend))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const addFriend = useCallback((friendInput) => {
    const friend = {
      id: makeId(),
      lastContactDate: new Date().toISOString(),
      snoozedUntil: null,
      archived: false,
      goalDays: 30,
      tags: [],
      bio: '',
      phone: '',
      preferredContact: 'text',
      ...friendInput,
    }
    setFriends((prev) => {
      const next = [...prev, friend]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
    return friend
  }, [])

  const deleteFriend = useCallback((id) => {
    setFriends((prev) => {
      const next = prev.filter((friend) => friend.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const getFriend = useCallback((id) => friends.find((friend) => friend.id === id), [friends])

  const value = {
    friends,
    loading,
    error,
    updateFriend,
    addFriend,
    deleteFriend,
    getFriend,
  }

  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>
}

export function useFriends() {
  const ctx = useContext(FriendsContext)
  if (!ctx) {
    throw new Error('useFriends must be used within a FriendsProvider')
  }
  return ctx
}
