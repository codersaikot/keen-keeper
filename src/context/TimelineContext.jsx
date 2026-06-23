import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const TimelineContext = createContext(null)
const STORAGE_KEY = 'keenkeeper_timeline'
const DAY_MS = 24 * 60 * 60 * 1000

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

/**
 * Seed data is expressed as "days ago" offsets rather than fixed dates, so the
 * timeline always looks current and lines up with each friend's seeded
 * "days since contact" in friends.json, no matter when the app is opened.
 */
function buildSeedTimeline() {
  const now = Date.now()
  const seed = [
    { friendId: 'f9', friendName: "Ryan O'Brien", type: 'call', daysAgo: 9 },
    { friendId: 'f6', friendName: 'Aisha Patel', type: 'call', daysAgo: 6 },
    { friendId: 'f1', friendName: 'Sarah Chen', type: 'text', daysAgo: 10 },
    { friendId: 'f4', friendName: 'James Wright', type: 'video', daysAgo: 12 },
    { friendId: 'f2', friendName: 'David Kim', type: 'call', daysAgo: 20 },
    { friendId: 'f3', friendName: 'Emma Wilson', type: 'video', daysAgo: 25 },
    { friendId: 'f7', friendName: 'Marcus Johnson', type: 'video', daysAgo: 27 },
    { friendId: 'f8', friendName: 'Olivia Martinez', type: 'text', daysAgo: 16 },
    { friendId: 'f10', friendName: 'Tom Baker', type: 'video', daysAgo: 40 },
    { friendId: 'f5', friendName: 'Lisa Nakamura', type: 'text', daysAgo: 62 },
    { friendId: 'f1', friendName: 'Sarah Chen', type: 'call', daysAgo: 33 },
    { friendId: 'f6', friendName: 'Aisha Patel', type: 'text', daysAgo: 21 },
    { friendId: 'f9', friendName: "Ryan O'Brien", type: 'text', daysAgo: 30 },
    { friendId: 'f4', friendName: 'James Wright', type: 'call', daysAgo: 48 },
    { friendId: 'f7', friendName: 'Marcus Johnson', type: 'text', daysAgo: 58 },
    { friendId: 'f2', friendName: 'David Kim', type: 'video', daysAgo: 70 },
  ]

  return seed
    .map((entry, index) => ({
      id: `seed-${index}`,
      friendId: entry.friendId,
      friendName: entry.friendName,
      type: entry.type,
      title: `${capitalize(entry.type)} with ${entry.friendName}`,
      date: new Date(now - entry.daysAgo * DAY_MS).toISOString(),
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function TimelineProvider({ children }) {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed)) {
          setTimeline(parsed)
          return
        }
      } catch {
        // corrupt cache — fall through and reseed
      }
    }
    const seeded = buildSeedTimeline()
    setTimeline(seeded)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
  }, [])

  const addTimeline = useCallback((entry) => {
    setTimeline((prev) => {
      const next = [entry, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const value = { timeline, addTimeline }

  return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>
}

export function useTimeline() {
  const ctx = useContext(TimelineContext)
  if (!ctx) {
    throw new Error('useTimeline must be used within a TimelineProvider')
  }
  return ctx
}
