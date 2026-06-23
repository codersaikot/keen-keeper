import { PiSealCheckFill, PiUsersThreeFill, PiWarningCircleFill, PiWarningFill } from 'react-icons/pi'
import SummaryCard from '../common/SummaryCard'
import { STATUS, getStatus } from '../../utils/statusUtils'

export default function SummaryCards({ friends }) {
  const counts = friends.reduce(
    (acc, friend) => {
      const status = getStatus(friend)
      acc[status] += 1
      return acc
    },
    { [STATUS.ON_TRACK]: 0, [STATUS.ALMOST_DUE]: 0, [STATUS.OVERDUE]: 0 },
  )

  const cards = [
    { icon: PiUsersThreeFill, label: 'Total Friends', value: friends.length, accent: 'primary' },
    { icon: PiSealCheckFill, label: 'On Track', value: counts[STATUS.ON_TRACK], accent: 'success' },
    { icon: PiWarningCircleFill, label: 'Almost Due', value: counts[STATUS.ALMOST_DUE], accent: 'warning' },
    { icon: PiWarningFill, label: 'Overdue', value: counts[STATUS.OVERDUE], accent: 'error' },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard key={card.label} {...card} />
      ))}
    </div>
  )
}
