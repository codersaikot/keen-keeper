import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import { FriendsProvider } from './context/FriendsContext'
import { TimelineProvider } from './context/TimelineContext'
import Home from './pages/Home'
import FriendDetails from './pages/FriendDetails'
import Timeline from './pages/Timeline'
import Stats from './pages/Stats'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <FriendsProvider>
      <TimelineProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3200,
            style: {
              background: '#1F2937',
              color: '#F8FAFC',
              borderRadius: '0.65rem',
              fontSize: '0.875rem',
            },
            success: {
              iconTheme: { primary: '#244D3F', secondary: '#F8FAFC' },
            },
            error: {
              iconTheme: { primary: '#C0392B', secondary: '#F8FAFC' },
            },
          }}
        />

        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="stats" element={<Stats />} />
            <Route path="friend/:id" element={<FriendDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TimelineProvider>
    </FriendsProvider>
  )
}
