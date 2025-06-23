import React from 'react'
import { SaveAll as All, CheckCircle, Circle, Clock } from 'lucide-react'

export function TodoFilters({ currentFilter, onFilterChange, counts }) {
  const filters = [
    { key: 'all', label: 'All Tasks', icon: All, count: counts.all },
    { key: 'active', label: 'Active', icon: Circle, count: counts.active },
    { key: 'completed', label: 'Completed', icon: CheckCircle, count: counts.completed },
    { key: 'overdue', label: 'Overdue', icon: Clock, count: counts.overdue },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(({ key, label, icon: Icon, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
            currentFilter === key
              ? 'bg-white/20 text-white shadow-lg scale-105'
              : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
          }`}
        >
          <Icon size={16} />
          <span>{label}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            currentFilter === key
              ? 'bg-white/20'
              : 'bg-white/10'
          }`}>
            {count}
          </span>
        </button>
      ))}
    </div>
  )
}