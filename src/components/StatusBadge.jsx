export default function StatusBadge({ status }) {
  const statusStyles = {
    'Applied': 'bg-blue-100 text-blue-700',
    'Shortlisted': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
    'pending': 'bg-yellow-100 text-yellow-700',
    'shortlisted': 'bg-green-100 text-green-700',
    'rejected': 'bg-red-100 text-red-700',
    'hired': 'bg-purple-100 text-purple-700'
  }

  const style = statusStyles[status] || 'bg-gray-100 text-gray-700'

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  )
}