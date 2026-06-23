# KeenKeeper — Keep Your Friendships Alive

KeenKeeper helps you stay close to the people who matter. Log calls, texts, and
video chats, set a personal reconnection goal per friend, and see at a glance
who's on track, almost due, or overdue for a catch-up.

## Tech Stack

- **React 19**
- **React Router DOM** — client-side routing
- **Tailwind CSS** + **DaisyUI** — styling and a custom `keenkeeper` theme
- **React Icons** (Phosphor set) — iconography
- **React Hot Toast** — toast notifications
- **Recharts** — the interaction breakdown pie chart on the Stats page
- **Vite** — dev server and build tooling

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## Project Structure

```
keenkeeper/
├── public/
│   ├── friends.json        # seed data — fetched at runtime by FriendsContext
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, Layout (route shell)
│   │   ├── common/          # Spinner, StatusBadge, Tag, SummaryCard, ConfirmModal
│   │   ├── home/            # HeroBanner, FriendCard, FriendsGrid, SummaryCards, AddFriendModal
│   │   ├── friend/          # ProfileCard, StatsRow, RelationshipGoalCard, QuickCheckIn
│   │   ├── timeline/        # TimelineItem, TimelineFilters
│   │   └── stats/           # InteractionsPieChart, StatTotalsCards
│   ├── context/
│   │   ├── FriendsContext.jsx   # friends list + archive/snooze/delete/add, persisted
│   │   └── TimelineContext.jsx  # timeline entries + addTimeline, persisted
│   ├── hooks/
│   │   └── useAvatarUrl.js  # deterministic illustrated avatars (DiceBear)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── FriendDetails.jsx    # /friend/:id
│   │   ├── Timeline.jsx
│   │   ├── Stats.jsx
│   │   └── NotFound.jsx
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── statusUtils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json
└── package.json
```

## How the Data Works

- **Friends** start out seeded from `public/friends.json` (fetched, not
  imported, on first load) and are then cached to `localStorage` under
  `keenkeeper_friends`. Every edit — adding a friend, archiving, snoozing,
  deleting, checking in, or changing a goal — updates that cache, so your data
  survives a refresh.
- **Timeline** entries live in `TimelineContext`, persisted to `localStorage`
  under `keenkeeper_timeline`, and start pre-seeded with a realistic history
  so the Timeline and Stats pages aren't empty on a first visit.
- To reset either dataset, clear `keenkeeper_friends` / `keenkeeper_timeline`
  from your browser's local storage (or run `localStorage.clear()` in the
  console) and reload.

### Status logic

A friend's status is derived from `lastContactDate` and their personal
`goalDays`:

- **Overdue** — days since contact has passed the goal
- **Almost Due** — within 30% of the goal (≥ 70% of `goalDays` elapsed)
- **On Track** — everything else, including any friend currently snoozed

## Features

- Responsive navbar with icon links and active-route highlighting
- Hero banner + four live summary cards (Total / On Track / Almost Due / Overdue)
- Friend grid (1 → 2 → 4 columns) with avatar, days-since-contact, tags, and status
- Add Friend modal with goal, tags, and bio
- Friend Details page: profile actions (Snooze 2 Weeks, Archive, Delete with
  confirmation), live stat tiles, an editable relationship goal, and a
  Quick Check-In panel (Call / Text / Video) that logs to the timeline and
  resets the contact clock
- Timeline page with All / Call / Text / Video filters
- Stats page with a Recharts pie chart of interactions, fed live by the
  timeline
- Custom 404 page
- Toast notifications for every state-changing action
- Loading and empty states throughout

## Deployment (Vercel)

This project includes a `vercel.json` with a catch-all rewrite so client-side
routes resolve correctly:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

To deploy: push this folder to a Git repository and import it in Vercel, or
run `vercel` from the project root with the Vercel CLI. No additional
configuration is required — Vercel auto-detects the Vite build (`npm run
build`, output in `dist/`).
